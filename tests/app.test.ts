import { ExpressApp } from "@utils/app";
import { Router } from "@utils/router";
import axios from "axios";
import { assert } from "chai";

describe("App", () => {
  describe(Router.checkhealth, () => {
    it("Returns 200 OK", async () => {
      // Health Check: GET request returns 200 OK
      const app = new ExpressApp({ isSilent: true });

      const res = await axios({
        method: "GET",
        baseURL: app.url(),
        url: Router.checkhealth,
      });

      app.close();

      const { status } = res;
      assert.equal(status, 200);
    });
  });

  describe(Router.uploadJson, () => {
    it("JSON data parsed successfully", async () => {
      // Upload JSON: POST request body successfully parsed
      const app = new ExpressApp({ isSilent: true });

      const dataReq = { name: "frian" };
      const res = await axios({
        method: "POST",
        baseURL: app.url(),
        data: dataReq,
        url: Router.uploadJson,
      });

      app.close();

      const { status, data: dataRes } = res;
      assert.equal(status, 200);
      assert.deepEqual(dataRes, dataReq);
    });
  });
});
