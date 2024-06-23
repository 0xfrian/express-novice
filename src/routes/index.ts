import { Request } from "express";
import { Response } from "express";

export default function helloWorld(_req: Request, res: Response) {
  // Returns "hello world!"
  res.status(200).send("hello world!");
}
