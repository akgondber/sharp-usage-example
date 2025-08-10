import sharp from "sharp";
import chroma from "chroma-js";
import { text, intro, outro, log } from "@clack/prompts";

const getNumber = async (message, options = {}) => {
  const input = await text({ message: message, ...options });

  return Number(input);
};

const replaceColor = async (options = {}) => {
  const imageFile = options.imageFile;

  const x = options.x;
  const y = options.y;
  const color = options.color;
  const destFilename = options.destFilename;

  const colorBuffer = await sharp({
    create: {
      width: 1,
      height: 1,
      channels: 3,
      background: color,
    },
  })
    .png()
    .toBuffer();

  const compositeList = [{
    input: colorBuffer,
    left: x,
    top: y,
    blend: "atop",
  }];

  try {
    await sharp(imageFile).composite(compositeList).toFile(destFilename);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const replaceColorInteractively = async (options = {}) => {
  const { root, destOutside } = options;
  intro("One");
  const imageFile = await text({
    message: "What is source image file?",
    ...options,
  });

  const x = await getNumber("What is left coord?");
  const y = await getNumber("What is top coord?");
  const color = await text({
    message: "What is length of line?"
  });

  const destFilename = await text({
    message: "What is destination image file?",
    ...options,
  });

  // Create a 1x1 pixel image of the new color
  const colorBuffer = await sharp({
    create: {
      width: 1,
      height: 1,
      channels: 3,
      background: color,
    },
  })
    .png()
    .toBuffer();

  const compositeList = [{
    input: colorBuffer,
    left: 0,
    top: 0,
    blend: "atop",
  }];

  try {
    await sharp(imageFile).composite(compositeList).toFile(destFilename);

    outro(`Finished successfully!`);
  } catch (error) {
    outro(`Failed - ${error.message}`);
  }
};

const showFirstPixelColor = async (options = {}) => {
  const { imageFile } = options;

  const data = await sharp(imageFile).raw().toBuffer();
  console.log('Color at first pixel:')
  console.log({r: data[0], g: data[1], b: data[2]});
};

export { replaceColorInteractively, replaceColor, showFirstPixelColor };
