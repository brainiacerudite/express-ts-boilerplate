import config from "@/config";
import HttpException from "@/exceptions/HttpException";
import { logger } from "@/utils/logger";
import mongoose from "mongoose";

const dbConnection = async () => {
  const dbConfig = config.db[config.db.type as keyof typeof config.db];

  try {
    if (config.db.type === "mongodb") {
      const { url, name } = dbConfig as { url: string; name: string };
      const mongoConfig = {
        url: `${url}/${name}`,
        options: {},
      };

      if (config.env === "development") {
        mongoose.set("debug", true);
      }

      await mongoose.connect(mongoConfig.url, mongoConfig.options);
    }
    // Uncomment and complete the following sections if needed
    // else if (config.db.type === "postgresql") {
    //   const client = new PgClient({
    //     connectionString: dbConfig.url,
    //   });

    //   await client.connect();
    //   // Store the client for later use
    //   global.pgClient = client;
    // } else if (config.db.type === "mysql") {
    //   const connection = await mysql.createConnection({
    //     host: dbConfig.host,
    //     user: dbConfig.user,
    //     password: dbConfig.password,
    //     database: dbConfig.database,
    //   });

    //   // Store the connection for later use
    //   global.mysqlConnection = connection;
    // }
    else {
      throw new HttpException(500, "Unsupported database type");
    }
  } catch (error: any) {
    logger.error("Database connection error:", error);
    throw new HttpException(500, `Internal server error: ${error.message}`);
  }
};

export default dbConnection;
