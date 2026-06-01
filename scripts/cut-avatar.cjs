// One-off: turn the flattened light background of avatar-pj2.png into real
// transparency. A simple colour threshold leaves fringe and can't tell the
// background from light details inside the figure (laptop text, highlights),
// so we FLOOD-FILL from the image borders: only light, low-chroma pixels that
// are connected to the edge are background. Internal light pixels are kept.
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const src = path.join(__dirname, "..", "src", "assets", "avatar-pj2.png");
const out = path.join(__dirname, "..", "src", "assets", "avatar-pj2-cut.png");

const png = PNG.sync.read(fs.readFileSync(src));
const { data, width: W, height: H } = png;
const N = W * H;

// 1. Candidate background = light + near-neutral (figure + glow are bluer/darker).
const isBg = new Uint8Array(N);
for (let p = 0; p < N; p++) {
  const i = p * 4;
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  const lum = (r + g + b) / 3;
  if (chroma < 38 && lum > 150) isBg[p] = 1;
}

// 2. Flood fill from every border pixel through connected candidate-bg pixels.
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

// 3. Apply alpha: reached background → transparent; everything else kept.
//    Plus a soft fade over the bottom so the figure dissolves (no base edge).
const fadeStart = H * 0.92;
let cleared = 0;
for (let p = 0; p < N; p++) {
  const i = p * 4;
  let alpha = reached[p] ? 0 : 255;
  if (alpha === 0) cleared++;
  const y = (p - (p % W)) / W;
  if (y > fadeStart) {
    alpha = Math.round(alpha * Math.max(0, (H - y) / (H - fadeStart)));
  }
  data[i + 3] = alpha;
}

fs.writeFileSync(out, PNG.sync.write(png));
console.log(`wrote ${out} (${W}x${H}), removed ${((cleared / N) * 100).toFixed(1)}% as background`);
