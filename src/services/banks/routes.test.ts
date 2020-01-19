import express, { Router } from "express";
import request from "supertest";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import { applyMiddleware, applyRoutes } from "../../utils";
import routes from "./routes";

describe("Routes", () => {
  let router: Router;
  const uuid: string = new Date().getTime().toString();
  let createdBankId: number;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
  });

  test("500 Internal Server Error", async () => {
    const response = await request(router).get("/api/v1/error");
    expect(response.status).toEqual(500);
  });

  test("500 Internal Server Error - Production", async () => {
    process.env.NODE_ENV = "production";
    const response = await request(router).get("/api/v1/error");
    expect(response.status).toEqual(500);
  });

  test("GET /banks 200 - Get Bank List", async () => {
    const response = await request(router).get("/api/v1/banks");
    expect(response.status).toEqual(200);
  });

  test("POST /banks 400 - Create Bank with empty body", async () => {
    const response = await request(router).post("/api/v1/banks");
    expect(response.status).toEqual(400);
  });

  test("POST /banks 201 - Create Bank", async () => {
    const response = await request(router).post("/api/v1/banks").send({
      country: "US",
      locality: "Locality",
      name: "TEST",
      postalCode: "0000",
      swift: uuid,
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual("TEST");
    expect(response.body.postalCode).toEqual("0000");
    expect(response.body.locality).toEqual("Locality");
    expect(response.body.country).toEqual("US");
  });

  test(`GET /banks?swift=${uuid} 200 - Get Bank List`, async () => {
    const response = await request(router).get(`/api/v1/banks?swift=${uuid}`);
    expect(response.status).toEqual(200);
    createdBankId = response.body[0].bankId;
  });

  test("GET /banks 404 - Method not found", async () => {
    const response = await request(router).get("/api/v11/banks");
    expect(response.status).toEqual(404);
  });

  test("GET /banks/:id 200 - Get Bank", async () => {
    const response = await request(router).get("/api/v1/banks/1");
    expect(response.status).toEqual(200);
  });

  test("GET /banks/:id 404 - Bank not found", async () => {
    const response = await request(router).get("/api/v1/banks/0");
    expect(response.status).toEqual(404);
  });

  test("GET /banks/:id 400 - Wrong id format", async () => {
    const response = await request(router).get("/api/v1/banks/qwerty");
    expect(response.status).toEqual(400);
  });

  test("DELETE /banks/:id 404 - Bank not found", async () => {
    const response = await request(router).delete("/api/v1/banks/0");
    expect(response.status).toEqual(404);
  });

  test("DELETE /banks/:id 200 - Bank deleted", async () => {
    const response = await request(router).delete(`/api/v1/banks/${createdBankId}`);
    expect(response.status).toEqual(200);
  });

  /*
  test("an empty string", async () => {
    const response = await request(router).get("/api/v1/search?q=");
    expect(response.status).toEqual(400);
  });
  */
});
