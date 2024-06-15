import express from "express";
import { Server, createServer } from "http";
import { AddressInfo } from "net";


export async function startApp() {
  const app = express();

  app.get("/", (_, res) => {
    res.send("hello world!");
  });

  const server = createServer(app);

  const PORT = 0;
  server.listen(PORT, () => {
    const { port } = server.address() as AddressInfo;
    const url = `http://localhost:${port}`;
    console.log(`\n🟢 Express app started: ${url}\n`);
  });

  function gracefulShutdown(app: Server) {
    app.close(() => {
      console.log("\n🔴 Express app ended\n")
      process.exit(0);
    });
  }

  process.on("SIGTERM", () => gracefulShutdown(server));
  process.on("SIGINT", () => gracefulShutdown(server));

  return server;
}
