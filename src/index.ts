import app from "./app";
import config from "./config";
import { logger } from "./utils/logger";

const server = app.listen(config.port, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${config.env} =======`);
  logger.info(`🚀 App listening on the port ${config.port}`);
  if (config.env === "development") {
    logger.info(
      `[server]: 🚀 Server is running at http://localhost:${config.port}`
    );
  }
  logger.info(`=================================`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  }
  process.exit(1);
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  if (server) {
    server.close();
  }
});
