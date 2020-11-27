export interface RGB {
  r: number,
  g: number,
  b: number
};

const decimalsToRGB = (r: number, g: number, b: number): RGB => ({
  r: Math.round(r * 255),
  g: Math.round(g * 255),
  b: Math.round(b * 255)
});

export const hsv2rgb = (h: number, s: number, v: number): RGB =>  {

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
      case 0:
        return decimalsToRGB(v, t, p);
      case 1:
        return decimalsToRGB(q, v, p);
      case 2:
        return decimalsToRGB(p, v, t);
      case 3:
        return decimalsToRGB(p, q, v);
      case 4:
        return decimalsToRGB(t, p, v);
      default: // case 5
        return decimalsToRGB(v, p, q);
  }
}