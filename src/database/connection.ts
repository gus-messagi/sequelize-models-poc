import { Error, Options, Sequelize } from "sequelize";

export default class SequelizeConnection {
  private static instance: Sequelize

  static getInstance(): Sequelize {
    if (!SequelizeConnection.instance) {
      const config: Options = {
        database: 'sequelize_poc',
        username: 'postgres',
        password: 'mysecretpassword',
        port: 5432,
        host: '127.0.0.1',
        dialect: 'postgres',
        benchmark: true,
        logging: (sql, timingMs) => console.info(`${sql} - [Execution time: ${timingMs}ms]`),
      }
      
      SequelizeConnection.instance = new Sequelize(config)
    }

    return SequelizeConnection.instance
  }

  static async connect(): Promise<Sequelize> {
    const sequelize = SequelizeConnection.getInstance()

    try {
      await sequelize.authenticate()

      console.log("Database connection authenticated successfully");
    } catch(error: any) {
      console.log("Error while creation connection to database :: " + error.message);
    } finally {
      return sequelize
    }
  }

  static async close(): Promise<Sequelize> {
    const sequelize = SequelizeConnection.getInstance();
    try {
      await sequelize.close();
      console.log("Database connection closed successfully");
    } catch (error: any) {
      console.log("Error while closing database connection :: " + error.message);
    } finally {
      return sequelize
    }
  }
}