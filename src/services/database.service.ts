import mongoose from "mongoose";

export const mongoDBConnection = () => {
  const dbConnUrl: string | undefined = process.env.DATABASE_URL;

  try {
    if (dbConnUrl) {
      mongoose.connect(dbConnUrl);

      const db = mongoose.connection;

      db.on("error", (error) => console.log(error.message));

      db.once("connected", (connected) =>
        console.log("Successfully connected to database!")
      );

      return db;
    }

    throw new Error("Database connection url is missing!");
  } catch (err: any) {
    throw new Error(err?.message);
  }
};
