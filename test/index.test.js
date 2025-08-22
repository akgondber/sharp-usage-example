import sharp from "sharp";
import { expect, test } from "vitest";
import { replaceColor } from "..";

const colors = [
  { r: 177, g: 52, b: 80 },
  { r: 177, g: 52, b: 81 },
  { r: 177, g: 52, b: 82 },
  { r: 177, g: 52, b: 83 },
  { r: 177, g: 52, b: 84 },
  { r: 177, g: 52, b: 85 },
  { r: 92, g: 232, b: 51 },
  { r: 178, g: 53, b: 83 },
  { r: 178, g: 53, b: 84 },
  { r: 178, g: 53, b: 85 },
  { r: 178, g: 53, b: 86 },
  { r: 178, g: 53, b: 87 },
  { r: 178, g: 53, b: 88 },
];

colors.map((color) => {
  test(`draws rgb(${color.r}, ${color.g}, ${color.b}) pixel`, async () => {
    const xCoord = 0;
    const yCoord = 0;
    const imageFile = "images/pngimage.png";
    const destFilename = `images/pngimage_processed_${color.r}_${color.g}_${color.b}.png`;

    await replaceColor({
      imageFile,
      color,
      destFilename,
      x: 0,
      y: 0,
    });

    const data = await sharp(destFilename).raw().toBuffer();
    const metadata = await sharp(destFilename).metadata();

    let iOffs = 0;
    let vertOffset = 0;
    let horOffset = 0;

    const pixelsData = [];
    let expectableColor;

    for (let i = 0; i < data.length; i += 3) {
      if (xCoord == horOffset && yCoord === vertOffset) {
        expectableColor = { r: data[i], g: data[i + 1], b: data[i + 2] };
        break;
      }
      // const currColor = chroma({ r: data[i], g: data[i + 1], b: data[i + 2] }).hex();
      // pixelsData.push({
      //     x: horOffset,
      //     y: vertOffset,
      //     color: currColor.hex()
      // });

      if (iOffs === metadata.width - 1) {
        vertOffset++;
        horOffset = 0;
        iOffs = 0;
      } else {
        iOffs++;
        horOffset++;
      }
    }

    expect(expectableColor).toBeDefined();
    expect(expectableColor).toEqual(color);
  });

  // JPEG format is lossy so for some drawn pixels might be a little discrepancy
  // https://github.com/lovell/sharp/issues/4438#issuecomment-3193672008
  test.skip(`draws rgb(${color.r}, ${color.g}, ${color.b}) pixel`, async () => {
    const xCoord = 0;
    const yCoord = 0;
    const imageFile = "images/1.jpg";
    const destFilename = `images/1_processed_${color.r}_${color.g}_${color.b}.jpg`;

    await replaceColor({
      imageFile,
      color,
      destFilename,
      x: 0,
      y: 0,
    });

    const data = await sharp(destFilename).raw().toBuffer();
    const metadata = await sharp(destFilename).metadata();

    let iOffs = 0;
    let vertOffset = 0;
    let horOffset = 0;

    const pixelsData = [];
    let expectableColor;

    for (let i = 0; i < data.length; i += 3) {
      if (xCoord == horOffset && yCoord === vertOffset) {
        expectableColor = { r: data[i], g: data[i + 1], b: data[i + 2] };
        break;
      }
      // const currColor = chroma({ r: data[i], g: data[i + 1], b: data[i + 2] }).hex();
      // pixelsData.push({
      //     x: horOffset,
      //     y: vertOffset,
      //     color: currColor.hex()
      // });

      if (iOffs === metadata.width - 1) {
        vertOffset++;
        horOffset = 0;
        iOffs = 0;
      } else {
        iOffs++;
        horOffset++;
      }
    }

    expect(expectableColor).toBeDefined();
    expect(expectableColor).toEqual(color);
  });
});
