import express from "express";
import { createServer, Server } from "http";
import { AddressInfo } from "net";
import { Router } from "@utils/router";
import checkHealth from "src/routes/healthcheck";
import helloWorld from "src/routes";
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";


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

    // Implement middleware for logging
    if (!isSilent) {
      app.use((req: Request, _res: Response, next: NextFunction) => {
        const { method, path } = req;
        console.log(`[${path}] ${method} request received`);
        next();
      });
    }

    // Assign endpoint handlers
    app.get(Router.index, helloWorld)
    app.get(Router.checkhealth, checkHealth);

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
    this.server.close(() => process.exit(0));
  }

  private gracefulShutdown(server: Server) {
    server.close(() => {
      console.log("\nShutting down Express app\n")
      process.exit(0);
    });
  }
}
