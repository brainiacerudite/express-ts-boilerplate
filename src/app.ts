import express from "express";
import dbConnection from "./database";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";
import RateLimiterMiddleware from "./middlewares/rateLimiter.middleware";
import RouteNotFoundMiddleware from "./middlewares/route.middleware";
import ErrorMiddleware from "./middlewares/error.middleware";

const app = express();

// connect to db
dbConnection();

// middlewares
app.use(morgan(config.log.format));
app.use(
  cors({ origin: config.cors.origin, credentials: config.cors.credential })
);
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// rate limiter middleware
app.use(RateLimiterMiddleware);

// register routes

// handle 404 not found
app.use(RouteNotFoundMiddleware);

// handle error
app.use(ErrorMiddleware);

export default app;
