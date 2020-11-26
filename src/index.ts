export {};

/*************************
 * src/pages/api/lobe.ts *
 *************************/

// import path from "path";
// import { Model } from "./model";
// import ImageConverter from "./image-converters/sharp-converter";

// const modelPath = path.resolve(
//   __dirname,
//   "../demo-classification-tflite/saved_model.tflite"
// );
// const rockImagePath =
//   "https://s3-production.bobvila.com/slides/23208/original/Base_Gravel__3.jpeg";
// const duckImagePath =
//   "https://images-na.ssl-images-amazon.com/images/I/51VXgNZFIoL._AC_SL1424_.jpg";

// const rockImagePath = path.resolve(
//   __dirname,
//   "../rock/optimized-3.4s-1-1.2RiverRock-1.jpg"
// );
// const duckImagePath = path.resolve(
//   __dirname,
//   "../rubber-duck/optimized-01-rubberduck-hongkong.jpg"
// );

// const converter = new ImageConverter();
// const model = new Model(modelPath, converter);

// (async () => {
//   const rock = await model.predict(rockImagePath);
//   const rubberDuck = await model.predict(duckImagePath);

//   console.log(rock);
//   console.log(rubberDuck);
// })();
