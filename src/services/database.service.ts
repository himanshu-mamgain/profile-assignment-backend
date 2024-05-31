import mongoose from "mongoose";

export const mongoDBConnection = () => {
  const dbConnUrl: string | undefined = process.env.DATABASE_URL;

  try {
    if (dbConnUrl) {
      mongoose.connect(dbConnUrl);

      const db = mongoose.connection;

      db.on("error", (err: any) => console.error(err?.message));

      db.once("connected", () =>
        console.log("Successfully connected to database!")
      );

      return db;
    }

    throw new Error("Database connection url is missing!");
  } catch (err: any) {
    console.error(err?.message);
  }
};
