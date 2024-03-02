import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      console.log("database conection eneable!");

      return true;
    } catch (error) {
      console.log("Mongo conection error");
      throw error;
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
  }
}
