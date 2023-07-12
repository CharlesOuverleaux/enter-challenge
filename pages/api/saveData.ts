import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method === "POST") {
    const jsonData = JSON.stringify(body, null, 2);
    fs.writeFileSync("data/userData.json", jsonData);
    res.status(200).json({ message: "Data saved successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
