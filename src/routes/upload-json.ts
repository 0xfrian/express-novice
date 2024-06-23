import { Request } from "express";
import { Response } from "express";

export default function uploadJson(req: Request, res: Response) {

  const { body } = req;

  res
    .status(200)
    .send(body);
}

