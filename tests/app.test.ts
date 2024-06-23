import { ExpressApp } from "@utils/app";
import { Router } from "@utils/router";
import axios from "axios";
import { assert } from "chai";

describe("App", () => {
  describe(Router.checkhealth, () => {
    it("Returns 200 OK", async () => {
      // Health Check: GET request returns 200 OK
      const app = new ExpressApp();

      const res = await axios({
        method: "GET",
        baseURL: app.url(),
        url: Router.checkhealth,
      });

      app.close();

      const { status } = res;
      assert(status == 200);
    });
  })
});
