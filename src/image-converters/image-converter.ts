export interface ImageConverter {
  getImageInput: (size: number, image: Buffer) => Promise<Float32Array>;
}
