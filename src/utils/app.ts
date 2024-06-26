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
  isSilent?: boolean,
}

export class ExpressApp {
  public server: Server;

  constructor({
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

    // Create HTTP server instance
    const server = createServer(app);

    // Implement graceful shutdown
    process.on("SIGTERM", () => this.gracefulShutdown(server));
    process.on("SIGINT", () => this.gracefulShutdown(server));

    // Assign class properties
    this.server = server;
  }

  public port() {
    if (this.server.listening) return (this.server.address() as AddressInfo).port;
    else throw new Error("Server is not listening for connections");

  }

  public url() {
    if (this.server.listening) return `http://localhost:${this.port()}`;
    else throw new Error("Server is not listening for connections");
  }

  public start(port: number = 0) {
    this.server.listen(port);
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
