import { ExpressApp } from "@utils/app";
import { Router } from "@utils/router";
import supertest from "supertest";
import { assert } from "chai";
import fs from "fs";
import { FilesParsed } from "src/routes/upload-image";

describe("App", () => {
  describe(Router.checkhealth, () => {
    it("Health Check", async () => {
      const app = new ExpressApp({ isSilent: true });

      const res = await supertest(app.url())
        .get(Router.checkhealth);

      app.close();

      const { status } = res;
      assert.equal(status, 200);
    });
  });

  describe(Router.uploadJson, () => {
    it("Uploading JSON", async () => {
      const app = new ExpressApp({ isSilent: true });

      const dataReq = { name: "frian" };

      const res = await supertest(app.url())
        .post(Router.uploadJson)
        .set("Content-Type", "application/json")
        .send(dataReq);

      app.close();

      const { status, body: dataRes } = res;
      assert.equal(status, 200);
      assert.deepEqual(dataRes, dataReq);
    });
  });

  describe(Router.uploadImage, () => {
    it("Uploading single image", async () => {
      const app = new ExpressApp({ isSilent: true });

      const imagePath = "public/dungeon.png"

      const res = await supertest(app.url())
        .post(Router.uploadImage)
        .attach("images", imagePath);

      app.close();

      const { status, body } = res;
      const images = body as FilesParsed[];
      assert.equal(status, 200);
      assert.equal(images.length, 1);
    });

    it("Uploading multiple images", async () => {

      const app = new ExpressApp({ isSilent: true });

      const files = fs.readdirSync("public")
        .map(file => "public/".concat(file));

      const req = supertest(app.url()).post(Router.uploadImage);
      files.forEach(file => req.attach("images", file));

      const res = await req;

      app.close();

      const { status, body } = res;
      const images = body as FilesParsed[];

      assert.equal(status, 200);
      assert.equal(images.length, files.length);
    });
  });
});
