import { isEmpty } from "@utils/helpers";
import { Request } from "express";
import { Response } from "express";

export default function uploadJson(req: Request, res: Response) {

  const { body } = req;

  if (!isEmpty(body)) res.status(200).send(body);
  else res.status(400).send();
}

