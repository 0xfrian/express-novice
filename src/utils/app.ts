import express from "express";
import { createServer, Server } from "http";
import { AddressInfo } from "net";
import { Router } from "@utils/router";
import checkHealth from "src/routes/healthcheck";
import helloWorld from "src/routes";
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import uploadJson from "src/routes/upload-json";
import multer from "multer";
import uploadImage from "src/routes/upload-image";
import uploadData from "src/routes/upload-data";


interface ConstructorProps {
  port?: number,
  isSilent?: boolean,
}

export class ExpressApp {
  public server: Server;
  public port: number;

  constructor({
    port = 0,
    isSilent = false,
  }: ConstructorProps = {}) {
    // Initialize Express app
    const app = express();

    const upload = multer();

    // Implement middleware for logging
    if (!isSilent) {
      app.use((req: Request, _res: Response, next: NextFunction) => {
        const { method, path } = req;
        console.log(`[${path}] ${method} request received`);
        next();
      });
    }

    // Implement middleware for parsing JSON data
    app.use(express.json());

    // Assign endpoint handlers
    app.get(Router.index, helloWorld)
    app.get(Router.checkhealth, checkHealth);
    app.post(Router.uploadJson, uploadJson);
    app.post(Router.uploadImage, upload.array("images"), uploadImage);
    app.post(Router.uploadData, upload.array("data"), uploadData);

    // Start server
    const server = createServer(app);
    server.listen(port);

    // Get port number
    let _port = (port == 0)
      ? (server.address() as AddressInfo).port
      : port;

    // Implement graceful shutdown
    process.on("SIGTERM", () => this.gracefulShutdown(server));
    process.on("SIGINT", () => this.gracefulShutdown(server));

    // Assign class properties
    this.server = server;
    this.port = _port;
  }

  public url() {
    return `http://localhost:${this.port}`;
  }

  public close() {
    this.server.close();
  }

  private gracefulShutdown(server: Server) {
    server.close(() => {
      console.log("\nShutting down Express app\n")
      process.exit(0);
    });
  }
}
