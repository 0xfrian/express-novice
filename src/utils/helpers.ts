import { Request } from "express";
import ansis from "../../node_modules/ansis/index";

export function baseUrl(port?: string) {
  return port
    ? `http://localhost:${port}`
    : `http://localhost:3000`
}

export enum Routes {
  Index = "/",
}

export function logReq(req: Request) {
  const routeStr = ansis.blue(`[${req.route.path}]`);
  console.log(`${routeStr} ${req.method} request received`);
}
