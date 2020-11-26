import fs from "fs-extra";
import isUrl from "is-url";
import axios from "axios";
import { Interpreter } from "node-tflite";
import { ImageConverter } from "./image-converters/image-converter";

export class Model {
  interpreter: Interpreter;

  constructor(
    private tflite: string | Buffer,
    private imageConverter: ImageConverter
  ) {}

  private async createInterpreter() {
    if (typeof this.tflite === "string") {
      this.tflite = await fs.readFile(this.tflite);
    }
    this.interpreter = new Interpreter(this.tflite);
    this.interpreter.allocateTensors();
  }

  private async getImageInput(size: number, image: string | Buffer) {
    if (typeof image === "string") {
      if (isUrl(image)) {
        const response = await axios.get<Buffer>(image, {
          responseType: "arraybuffer",
        });
        image = response.data;
      } else {
        image = await fs.readFile(image);
      }
    }
    return this.imageConverter.getImageInput(size, image);
  }

  /**
   * @param image - buffer, url, or filepath
   */
  async predict(image: string | Buffer) {
    if (!this.interpreter) {
      await this.createInterpreter();
    }
    const inputData = await this.getImageInput(224, image);
    this.interpreter.inputs[0].copyFrom(inputData);

    this.interpreter.invoke();

    // get string output
    const outputData = Buffer.alloc(this.interpreter.outputs[0].byteSize);
    this.interpreter.outputs[0].copyTo(outputData);

    const label = outputData.toString();
    // trim to alphanumeric characters
    // https://stackoverflow.com/a/14572494
    return label.replace(/[^a-zA-Z0-9 -]/g, "");
  }
}
