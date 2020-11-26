import sharp from "sharp";
import { ImageConverter } from "./image-converter";

export default class SharpConverter implements ImageConverter {
  async getImageInput(size: number, image: Buffer) {
    const { data, info } = await sharp(image)
      .resize(size, size)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      // https://stackoverflow.com/questions/54847139/how-to-read-buffer-data-of-image-returned-by-sharp#comment96469346_54847139
      .raw()
      .toBuffer({ resolveWithObject: true });

    const channels = info.channels;

    const inputData = new Float32Array(size * size * 3); // Use Float32Array instead of Uint8Array

    for (let i = 0; i < size * size; ++i) {
      inputData[i * 3] = data[i * channels] / 255; // Convert 0...255 int to 0...1 float
      inputData[i * 3 + 1] = data[i * channels + 1] / 255;
      inputData[i * 3 + 2] = data[i * channels + 2] / 255;
    }
    return inputData;
  }
}
