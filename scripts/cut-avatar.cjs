// One-off: avatar.png was exported with the transparency checkerboard flattened
// into the pixels (RGBA but fully opaque), so we remove it to get real alpha.
// The checkerboard is neutral grey (chroma ~0, luminance ~54/95); the figure is
// blue-tinted (chroma >= ~13 even in the dark hoodie). We FLOOD-FILL from the
// borders through neutral-grey pixels so only the connected background is keyed
// out — internal details (laptop screen) are preserved.
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const src = path.join(__dirname, "..", "src", "assets", "avatar.png");
const out = path.join(__dirname, "..", "src", "assets", "avatar-cut.png");

const png = PNG.sync.read(fs.readFileSync(src));
const { data, width: W, height: H } = png;
const N = W * H;

// Candidate background = neutral grey in the checkerboard's luminance range.
const isBg = new Uint8Array(N);
for (let p = 0; p < N; p++) {
  const i = p * 4;
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  const lum = (r + g + b) / 3;
  if (chroma < 12 && lum > 38 && lum < 120) isBg[p] = 1;
}

// Flood fill from every border pixel through connected candidate-bg pixels.
const reached = new Uint8Array(N);
const stack = new Uint32Array(N);
let sp = 0;
const seed = (p) => {
  if (isBg[p] && !reached[p]) {
    reached[p] = 1;
    stack[sp++] = p;
  }
};
for (let x = 0; x < W; x++) {
  seed(x);
  seed((H - 1) * W + x);
}
for (let y = 0; y < H; y++) {
  seed(y * W);
  seed(y * W + (W - 1));
}
while (sp > 0) {
  const p = stack[--sp];
  const x = p % W;
  const y = (p - x) / W;
  if (x > 0) seed(p - 1);
  if (x < W - 1) seed(p + 1);
  if (y > 0) seed(p - W);
  if (y < H - 1) seed(p + W);
}

// Apply alpha + a soft base fade so the figure dissolves at the bottom.
const fadeStart = H * 0.93;
let cleared = 0;
for (let p = 0; p < N; p++) {
  let alpha = reached[p] ? 0 : 255;
  if (alpha === 0) cleared++;
  const y = (p - (p % W)) / W;
  if (y > fadeStart) alpha = Math.round(alpha * Math.max(0, (H - y) / (H - fadeStart)));
  data[p * 4 + 3] = alpha;
}

fs.writeFileSync(out, PNG.sync.write(png));
console.log(`wrote ${out} (${W}x${H}), removed ${((cleared / N) * 100).toFixed(1)}% as background`);
