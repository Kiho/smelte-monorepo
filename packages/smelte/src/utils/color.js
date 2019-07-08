// Color generation utility borrowed from
// https://github.com/mbitson/mcg/blob/c484a34a4f670d75b7a0824bbdc9945703e3a4f8/scripts/controllers/ColorGeneratorCtrl.js

const tinycolor = require("tinycolor2");

function multiply(rgb1, rgb2) {
  rgb1.b = Math.floor((rgb1.b * rgb2.b) / 255);
  rgb1.g = Math.floor((rgb1.g * rgb2.g) / 255);
  rgb1.r = Math.floor((rgb1.r * rgb2.r) / 255);
  return tinycolor("rgb " + rgb1.r + " " + rgb1.g + " " + rgb1.b);
}

const o = (value, name) => ({
  [name]: tinycolor(value).toHexString()
});

function buildPalette(hex) {
  const baseLight = tinycolor("#ffffff");
  const baseDark = multiply(tinycolor(hex).toRgb(), tinycolor(hex).toRgb());
  const baseTriad = tinycolor(hex).tetrad();

  return {
    ...o(tinycolor.mix(baseLight, hex, 12), "50"),
    ...o(tinycolor.mix(baseLight, hex, 30), "100"),
    ...o(tinycolor.mix(baseLight, hex, 50), "200"),
    ...o(tinycolor.mix(baseLight, hex, 70), "300"),
    ...o(tinycolor.mix(baseLight, hex, 85), "400"),
    ...o(tinycolor.mix(baseLight, hex, 100), "500"),
    ...o(tinycolor.mix(baseDark, hex, 87), "600"),
    ...o(tinycolor.mix(baseDark, hex, 70), "700"),
    ...o(tinycolor.mix(baseDark, hex, 54), "800"),
    ...o(tinycolor.mix(baseDark, hex, 25), "900"),
    ...o(
      tinycolor
        .mix(baseDark, baseTriad[4], 15)
        .saturate(80)
        .lighten(65),
      "a100"
    ),
    ...o(
      tinycolor
        .mix(baseDark, baseTriad[4], 15)
        .saturate(80)
        .lighten(55),
      "a200"
    ),
    ...o(
      tinycolor
        .mix(baseDark, baseTriad[4], 15)
        .saturate(100)
        .lighten(45),
      "a400"
    ),
    ...o(
      tinycolor
        .mix(baseDark, baseTriad[4], 15)
        .saturate(100)
        .lighten(40),
      "a700"
    )
  };
}

function generate(colors) {
  return Object.keys(colors).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: buildPalette(colors[cur])
    }),
    {}
  );
}

module.exports = generate;
