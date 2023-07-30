import type { AppContext } from "./context";
import express from "express";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

const startServer = async () => {
  // @ts-ignore
  const server = new ApolloServer<AppContext>({ schema: undefined });

  const app = express();

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  );

  app.listen(4000);

  console.log(`🚀 Server listening on port 4000`);
};

startServer();
