import { ExpressApp } from "@utils/app";
import { Router } from "@utils/router";
import supertest from "supertest";
import { assert } from "chai";
import fs from "fs";
import { FilesParsed } from "src/routes/upload-image";
import { Request } from "supertest";

describe("App", () => {
  describe(Router.checkhealth, () => {
    it("Returns 200 OK", async () => {
      const app = new ExpressApp({ isSilent: true });

      const req: Request = supertest(app.url()).get(Router.checkhealth) as any;
      const res = await req;

      app.close();

      const { status } = res;
      assert.equal(status, 200);
    });
  });

  describe(Router.uploadJson, () => {
    it("Empty body returns 400 BAD REQUEST", async () => {
      const app = new ExpressApp({ isSilent: true });

      const req = supertest(app.url()).post(Router.uploadJson) as any;
      const res = await req.send();

      app.close();

      const { status } = res;
      assert.equal(status, 400);
    });

    it("Uploading JSON returns 200 OK", async () => {
      const app = new ExpressApp({ isSilent: true });

      const dataReq = { name: "frian" };

      const req = supertest(app.url()).post(Router.uploadJson) as any;
      const res = await req.send(dataReq);

      app.close();

      const { status, body: dataRes } = res;
      assert.equal(status, 200);
      assert.deepEqual(dataRes, dataReq);
    });
  });

  describe(Router.uploadImage, () => {
    it("Empty body returns 400 BAD REQUEST", async () => {
      const app = new ExpressApp({ isSilent: true });

      const req: Request = supertest(app.url()).post(Router.uploadImage) as any;
      const res = await req;

      app.close();

      const { status } = res;
      assert.equal(status, 400);
    });

    it("Uploading single image returns 200 OK", async () => {
      const app = new ExpressApp({ isSilent: true });

      const imagePath = "public/dungeon.png"

      const req: Request = supertest(app.url()).post(Router.uploadImage) as any;
      const res = await req.attach("images", imagePath);

      app.close();

      const { status, body } = res;
      const images = body as FilesParsed[];
      assert.equal(status, 200);
      assert.equal(images.length, 1);
    });

    it("Uploading multiple images returns 200 OK", async () => {

      const app = new ExpressApp({ isSilent: true });

      const files = fs.readdirSync("public")
        .map(file => "public/".concat(file));

      const req: Request = supertest(app.url()).post(Router.uploadImage) as any;
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
