import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Express } from "express-serve-static-core";

export const swaggerSetup = (app: Express, port: string | number): void => {
  const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Profile Assignment APIs",
        version: "1.0.0",
        description: "API Documentation of Profile Assignment",
      },
    },
    servers: [{ url: `http://localhost:${port}` }],
    apis: ["./src/routes/*.ts"],
  };

  const swaggerSpec = swaggerJsDoc(swaggerOptions);

  // serve swagger UI
  app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
