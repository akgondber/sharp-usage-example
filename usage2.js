import { replaceColor } from "./index.js";

await replaceColor({
    imageFile: 'images/sample.jpg',
    x: 0,
    y: 0,
    destFilename: 'images/sample_processed_2.jpg',
    color: { r: 177, g: 52, b: 85 },
});
