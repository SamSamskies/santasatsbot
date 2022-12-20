import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { payLightningAddress } from "utils/payLightningAddress";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      if (req.headers.referer && !req.headers.referer.includes("api")) {
        try {
          return res
            .status(200)
            .send(
              await payLightningAddress(req.body.lightningAddress)
            );
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json(error.response.data);
          }

          if (axios.isAxiosError(error) && error.code) {
            return res.status(Number(error.code)).send(error.message);
          }

          return res.status(500).send("Something went wrong :(");
        }
      } else {
        return res.status(403).send("Forbidden");
      }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
