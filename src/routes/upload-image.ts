import { formatBytes } from "@utils/helpers";
import { Request } from "express";
import { Response } from "express";

export interface FilesParsed {
  name: string,
  size: string,
  fileType: string,
}

export default function uploadImage(req: Request, res: Response) {

  const files = req.files as Express.Multer.File[];

  if (files?.length > 0) {
    const filesParsed: FilesParsed[] = files.map(file => ({
      name: file.originalname,
      size: formatBytes(file.size),
      fileType: file.mimetype,
    }));

    res
      .status(200)
      .send(filesParsed);
  } else res.status(400).send();
}

