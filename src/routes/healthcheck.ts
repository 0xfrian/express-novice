import { Request } from "express";
import { Response } from "express";

export default function checkHealth(_req: Request, res: Response) {
  // Simply return 200 OK
  res.status(200).send();
}
