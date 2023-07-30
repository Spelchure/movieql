import "reflect-metadata";
import "dotenv/config";
import type { AppContext } from "./context";
import express from "express";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import config from "./config";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import { MovieResolver } from "./movie/movie-resolver";
import { prisma } from "./db";

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [MovieResolver],
  });
  const server = new ApolloServer<AppContext>({ schema });

  const app = express();

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  );

  const port = config.read<number>("PORT");
  app.listen(port);

  console.log(`🚀 Server listening on port ${port}`);
};

startServer()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
