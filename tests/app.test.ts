import { closeApp, startApp } from "@utils/app.js";
import { Routes, baseUrl } from "@utils/helpers.js";


describe("Health Check", () => {
  const routeStr = ansis(`[/]`);
  test(`[${routeStr}] GET returns 200 OK`, async () => {
    const server = await startApp();

    const res = await axios({
      method: "GET",
      baseURL: baseUrl(),
      url: Routes.Index,
    });

    expect(res.status == 200);

    await closeApp(server);
  });
});
