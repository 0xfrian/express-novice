import express from "express";
import cors from "cors";
import { Server } from "http";
import type { AddressInfo } from "net";
import { logReq } from "@utils/helpers"


// Start express server
export async function startApp({
  port = 0,
  verbose = true,
}: {
  port?: number,
  verbose?: boolean,
} = {}) {
  const _app = express();
  _app.use(cors());          // Enable CORS
  _app.use(express.json())   // Enable JSON parsing

  _app.get("/", (req, res) => {
    logReq(req);
    res.send("hello world!");
  });

  _app.post("/post/json", (req, res) => {
    logReq(req);
    console.log("  󰘍 Body:", req.body);
    res.status(200).send();
  });

  const app = _app.listen(port, () => {
    if (verbose) {
      console.log(` 🟢 Express app started: http://localhost:${port}`);
      const address = app.address() as AddressInfo;
      port = address.port;
    }
  });

  const address = app.address() as AddressInfo;
  port = address.port;

  // Graceful shutdown
  process.on("SIGINT", () => closeApp({ app }));

  return { app, port };
}

// Close express server
export async function closeApp({
  app,
  verbose = true,
}: {
  app: Server,
  verbose?: boolean,
}) {
  app.close(() => {
    if (verbose) console.log("\n 🟣 Express app ended\n");
  });
}
