import { configDotenv } from "dotenv";

configDotenv({ path: ".env" });

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  api: {
    name: process.env.API_NAME || "Express API",
    url: process.env.API_URL || "http://localhost:5000",
    prefix: process.env.API_PREFIX || "/api/v1",
  },
  frontend: {
    url: process.env.FRONTEND_URL,
  },
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    credential: process.env.FRONTEND_URL !== "*" ? true : false,
  },
  log: {
    format: process.env.LOG_FORMAT || "combined",
    dir: process.env.LOG_DIR || "logs",
    level: process.env.LOG_LEVEL || "info",
  },
  db: {
    type: process.env.DB_TYPE || "mongodb", // "mongodb", "postgresql", or "mysql"
    mongodb: {
      url: process.env.DB_URL,
      name: process.env.DB_NAME,
    },
    postgresql: {
      url: process.env.DB_URL,
    },
    mysql: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    jwt: {
      secret: process.env.JWT_SECRET || "secret",
      access: {
        expiresIn: process.env.JWT_ACCESS_EXPIRES || "60", // in minutes
      },
      refresh: {
        expiresIn: process.env.JWT_REFRESH_EXPIRES || "30", // in days
      },
      resetPassword: {
        expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES || "30", // in minutes
      },
      verifyEmail: {
        expiresIn: process.env.JWT_VERIFY_EMAIL_EXPIRES || "30", // in minutes
      },
    },
    mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
      from: {
        email: process.env.MAIL_FROM,
        name: process.env.MAIL_FROM_NAME,
      },
    },
  },
};

export default config;
