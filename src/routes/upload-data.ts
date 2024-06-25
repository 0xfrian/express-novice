import { formatBytes, isEmpty } from "@utils/helpers";
import { Request } from "express";
import { Response } from "express";

export interface FilesParsed {
  name: string,
  size: string,
  fileType: string,
}

export interface UploadDataResponse {
  json: any,
  files: FilesParsed[],
}

export default function uploadData(req: Request, res: Response) {

  // Parse request data
  const { body } = req;
  const files = req.files as Express.Multer.File[];

  // Initialize response data
  let data: UploadDataResponse = {
    json: {},
    files: [],
  };

  if (isEmpty(body) && !files?.length) {
    res.status(400).send();
    return;
  }

  // Parse JSON (if any)
  if (!isEmpty(body)) {
    const json = JSON.parse(body?.json);
    data.json = json;
  }

  // Parse files (if any)
  if (files?.length > 0) {
    const filesParsed: FilesParsed[] = files.map(file => ({
      name: file.originalname,
      size: formatBytes(file.size),
      fileType: file.mimetype,
    }));
    data.files = filesParsed;
  }

  res.status(200).send(data);
}
