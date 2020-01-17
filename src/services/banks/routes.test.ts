import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import promiseRequest from "request-promise";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "./routes";

describe("routes", () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
  });

  test("GET /banks 200 - Get Bank List", async () => {
    const response = await request(router).get("/api/v1/banks");
    expect(response.status).toEqual(200);
  });

  test("POST /banks 400 - Create Bank with empty body", async () => {
    const response = await request(router).post("/api/v1/banks");
    expect(response.status).toEqual(400);
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
  
  /*
  test("an empty string", async () => {
    const response = await request(router).get("/api/v1/search?q=");
    expect(response.status).toEqual(400);
  });
  */
});