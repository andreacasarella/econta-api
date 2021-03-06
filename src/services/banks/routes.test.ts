import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import promiseRequest from "request-promise";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "./routes";

jest.mock("request-promise");
(promiseRequest as any).mockImplementation(() => '{"features": []}');

describe("routes", () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
  });

  test("test route call", async () => {
    const response = await request(router).get("/api/v1/banks");
    expect(response.status).toEqual(200);
  });

  test("a non-existing api method", async () => {
    const response = await request(router).get("/api/v11/banks");
    expect(response.status).toEqual(404);
  });
  
  /*
  test("an empty string", async () => {
    const response = await request(router).get("/api/v1/search?q=");
    expect(response.status).toEqual(400);
  });
  */
});