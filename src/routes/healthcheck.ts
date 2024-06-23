import { Request } from "express";
import { Response } from "express";

export default function checkHealth(_req: Request, res: Response) {
  res.status(200).send();
}
