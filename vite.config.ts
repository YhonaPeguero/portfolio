import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
// Plain JSON so this file and the app can share it (see src/i18n/locales.ts).
import site from "./src/i18n/site.json";

type Locale = keyof typeof site.locales;
const LOCALES = Object.keys(site.locales) as Locale[];
const DEFAULT_LOCALE = site.defaultLocale as Locale;
const META = site.locales;

const attr = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
// Same rule as pathForLocale() in src/i18n/locales.ts: "/" for the default, "/es/" for the rest.
const urlFor = (locale: Locale) => site.url + (locale === DEFAULT_LOCALE ? "/" : `/${locale}/`);

/** Every language version, plus x-default pointing at the default one. */
const alternates = (tag: (hreflang: string, href: string) => string, indent: string) =>
  [
    ...LOCALES.map((locale) => tag(locale, urlFor(locale))),
    tag("x-default", urlFor(DEFAULT_LOCALE)),
  ].join(`\n${indent}`);

/** The language-dependent part of <head>, from src/i18n/site.json. */
function headFor(locale: Locale): string {
  const meta = META[locale];
  const url = urlFor(locale);
  return [
    `<title>${meta.title.replace(/&/g, "&amp;")}</title>`,
    `<meta name="description" content="${attr(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    alternates((hreflang, href) => `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`, "    "),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${attr(meta.title)}" />`,
    `<meta property="og:description" content="${attr(meta.ogDescription)}" />`,
    `<meta property="og:locale" content="${meta.ogLocale}" />`,
    ...LOCALES.filter((other) => other !== locale).map(
      (other) => `<meta property="og:locale:alternate" content="${META[other].ogLocale}" />`
    ),
  ].join("\n    ");
}

const HEAD_SLOT = /<!--i18n:head-->[\s\S]*?<!--\/i18n:head-->/;

function localizeHtml(html: string, locale: Locale): string {
  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
    .replace(HEAD_SLOT, `<!--i18n:head-->\n    ${headFor(locale)}\n    <!--/i18n:head-->`);
}

function sitemap(): string {
  const links = alternates(
    (hreflang, href) => `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`,
    "    "
  );
  const urls = LOCALES.map((locale) => `  <url>\n    <loc>${urlFor(locale)}</loc>\n    ${links}\n  </url>`);
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

/**
 * One static HTML per language, so crawlers and link previews get the right
 * title, description, canonical and hreflang without running JavaScript:
 *   dist/index.html      English (default)
 *   dist/es/index.html   Spanish
 * Same app bundle in both; the app reads the language from the URL. Also
 * writes sitemap.xml. Locale pages are skipped when the site is not built for
 * the domain root (e.g. `--base ./` previews), where those URLs can't exist.
 */
function localePages(): Plugin {
  let atRoot = true;
  return {
    name: "locale-pages",
    enforce: "post",
    configResolved(config) {
      atRoot = config.base === "/";
    },
    transformIndexHtml: {
      order: "pre",
      handler: (html) => localizeHtml(html, DEFAULT_LOCALE),
    },
    generateBundle(_options, bundle) {
      if (!atRoot) return;
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") {
        this.error("locale-pages: index.html was not found in the bundle");
      }
      const html = String(index.source);
      for (const locale of LOCALES) {
        if (locale === DEFAULT_LOCALE) continue;
        this.emitFile({
          type: "asset",
          fileName: `${locale}/index.html`,
          source: localizeHtml(html, locale),
        });
      }
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap() });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localePages()],
  build: {
    // Split the heavy 3D layer into its own chunk so the rest of the
    // page (boot sequence, content) can paint before Three.js loads.
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          r3f: ["@react-three/fiber", "@react-three/drei"],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
});
