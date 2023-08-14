import "reflect-metadata";
import { AppContext } from "@/context";
import { MovieResolver } from "@/movie/movie-resolver";

import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";

describe("Test for movie resolver", () => {
  it("Returns xxx", async () => {
    // Arrange
    const schema = await buildSchema({
      resolvers: [MovieResolver],
    });
    const testServer = new ApolloServer<AppContext>({ schema });

    // Act
    const response = await testServer.executeOperation({
      query: "query GetMovies { getAllMovies { id, name, description } }",
    });

    // @ts-ignore
    // FIX: fix this.
    console.log(response.body.singleResult.data.getAllMovies);
  });
});
