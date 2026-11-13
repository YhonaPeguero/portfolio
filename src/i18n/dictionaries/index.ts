import type { Locale } from "../locales";
import { en, type Dictionary } from "./en";
import { es } from "./es";

export type { Dictionary };

/** One dictionary per locale: `Record<Locale, …>` makes a missing one a compile error. */
export const DICTIONARIES: Record<Locale, Dictionary> = { en, es };
