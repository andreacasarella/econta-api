import express from "express";
import http from "http";
import { factory } from "./configLog4j";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import { applyMiddleware, applyRoutes } from "./utils";

/**
 * https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407
 */

const log = factory.getLogger("Server");

process.on("uncaughtException", (e) => {
  log.info(() => "Exception: " + e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  log.info(() => "Rejection: " + e);
  process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  log.info(`Running http://localhost:${PORT}...`),
);
