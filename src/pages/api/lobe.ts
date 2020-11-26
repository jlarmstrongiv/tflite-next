// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import ImageConverter from "../../image-converters/sharp-converter";
import { Model } from "../../model";
import axios from "axios";

/**
 * POST
 * json body
 * { "image": "https://images-na.ssl-images-amazon.com/images/I/51VXgNZFIoL._AC_SL1424_.jpg" }
 */

let modelBuffer: Buffer;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!modelBuffer) {
    const response = await axios.get<Buffer>(
      "https://static.fromthe.exchange/file/exchange-fromthe-static/temp/saved_model.tflite",
      {
        responseType: "arraybuffer",
      }
    );
    modelBuffer = response.data;

    res.statusCode = 200;
    res.json({ message: "loaded model" });
    return;
  }

  if (req.method !== "POST" || !req.body) {
    res.statusCode = 200;
    res.json({ message: "improper request" });
    return;
  }

  const converter = new ImageConverter();
  const model = new Model(modelBuffer, converter);

  const prediction = await model.predict(req.body.image);

  res.statusCode = 200;
  res.json({ prediction });
  return;
};
