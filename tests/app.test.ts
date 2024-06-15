import { startApp } from "@utils/app";
// NOTE: Unable to import Node modules 😭 

describe("Health Check", () => {
  test("[/checkhealth] GET returns 200 OK", async () => {
    const server = await startApp();
    // const { port } = server.address() as AddressInfo;
  });
});
