import { replaceColor } from "./index.js";

await replaceColor({
    imageFile: 'images/zu.png',
    x: 0,
    y: 0,
    destFilename: 'images/zu_processed.png',
    color: { r: 17, g: 253, b: 180 },
});
