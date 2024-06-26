import { ExpressApp } from "@utils/app";
import { Router } from "@utils/router";
import supertest from "supertest";
import { assert } from "chai";
import fs from "fs";
import { FilesParsed } from "src/routes/upload-image";
import { Request } from "supertest";
import { UploadDataResponse } from "src/routes/upload-data";

describe("App", () => {
  describe(Router.checkhealth, () => {
    it("Returns 200 OK", async () => {
      const app = new ExpressApp({ isSilent: true });
      const req: Request = supertest(app.server).get(Router.checkhealth) as any;
      const res = await req;

      const { status } = res;
      assert.equal(status, 200);
    });
  });

  describe(Router.uploadJson, () => {
    it("Empty body returns 400 BAD REQUEST", async () => {
      const app = new ExpressApp({ isSilent: true });
      const req = supertest(app.server).post(Router.uploadJson) as any;
      const res = await req.send();

      const { status } = res;
      assert.equal(status, 400);
    });

    it("Uploading JSON returns 200 OK", async () => {
      const app = new ExpressApp({ isSilent: true });
      const dataReq = { name: "frian" };
      const req = supertest(app.server).post(Router.uploadJson) as any;
      const res = await req.send(dataReq);

      const { status, body: dataRes } = res;
      assert.equal(status, 200);
      assert.deepEqual(dataRes, dataReq);
    });
  });

  describe(Router.uploadImage, () => {
    it("Empty body returns 400 BAD REQUEST", async () => {
      const app = new ExpressApp({ isSilent: true });
      const req: Request = supertest(app.server).post(Router.uploadImage) as any;
      const res = await req;

      const { status } = res;
      assert.equal(status, 400);
    });

    it("Uploading single image returns 200 OK", async () => {
      const app = new ExpressApp({ isSilent: true });
      const imagePath = "public/dungeon.png"
      const req: Request = supertest(app.server).post(Router.uploadImage) as any;
      const res = await req.attach("images", imagePath);

      const { status, body } = res;
      const images = body as FilesParsed[];
      assert.equal(status, 200);
      assert.equal(images.length, 1);
    });

    it("Uploading multiple images returns 200 OK", async () => {
      const app = new ExpressApp({ isSilent: true });
      const files = fs.readdirSync("public")
        .map(file => "public/".concat(file));
      const req: Request = supertest(app.server).post(Router.uploadImage) as any;
      files.forEach(file => req.attach("images", file));
      const res = await req;

      const { status, body } = res;
      const images = body as FilesParsed[];
      assert.equal(status, 200);
      assert.equal(images.length, files.length);
    });
  });

  describe(Router.uploadData, () => {
    it("Empty body returns 400 BAD REQUEST", async () => {
      const app = new ExpressApp({ isSilent: true });
      const req: Request = supertest(app.server).post(Router.uploadData) as any;
      const res = await req;
      
      const { status } = res;
      assert.equal(status, 400);
    });

    it("Uploading JSON + single image returns 200 OK", async () => {
      const app = new ExpressApp({ isSilent: true });
      const imagePath = "public/dungeon.png"
      const dataReq = { name: "frian" };
      const req: Request = supertest(app.server).post(Router.uploadData) as any;
      const res = await req
        .attach("data", imagePath)
        .field("json", JSON.stringify(dataReq));

      const { status } = res;
      const body = res.body as UploadDataResponse;
      assert.equal(status, 200);
      assert.deepEqual(body.json, dataReq);
      assert.equal(body.files.length, 1);
    });

    it("Uploading JSON + multiple images returns 200 OK", async () => {
      const app = new ExpressApp({ isSilent: true });
      const files = fs.readdirSync("public")
        .map(file => "public/".concat(file));
      const dataReq = { name: "frian" };
      const req: Request = supertest(app.server).post(Router.uploadData) as any;
      files.forEach(file => req.attach("data", file));
      const res = await req.field("json", JSON.stringify(dataReq));

      const { status } = res;
      const body = res.body as UploadDataResponse;
      assert.equal(status, 200);
      assert.deepEqual(body.json, dataReq);
      assert.equal(body.files.length, 3);
    });
  });
});
