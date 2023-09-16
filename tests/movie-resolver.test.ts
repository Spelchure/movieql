import "reflect-metadata";
import { AppContext } from "@/context";
import { MovieResolver } from "@/movie/movie-resolver";
import { prisma } from "@/db";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import util from "util";
import { exec as execSync } from "node:child_process";
import {
  MutationGraphQLQueryBuilder,
  QueryGraphQLQueryBuilder,
} from "./graphql-query-builder";
import { Movie } from "@/movie/movie";
import chai, { assert, expect } from "chai";
import chaiSubset from "chai-subset";
chai.use(chaiSubset);

const exec = util.promisify(execSync);

const clearDB = async () => {
  await exec("npx prisma db push --force-reset --accept-data-loss");
};

describe("Test for movie resolver", () => {
  beforeEach(async () => {
    await clearDB();
  });

  test.each([
    [[{ name: "Simple name", description: null }]],
    [[{ name: "Another name", description: "And the description" }]],
    [
      [
        { name: "Simple name", description: null },
        { name: "Another name", description: "And the description" },
      ],
    ],
  ])(
    "getAllMovies should return all movies",
    async (movies, limit: number = 10) => {
      // Arrange
      const queryBuilder = new QueryGraphQLQueryBuilder("getAllMovies");
      // FIX: should add database in the beforeEach section
      await prisma.movie.createMany({ data: movies });
      const schema = await buildSchema({
        resolvers: [MovieResolver],
      });
      const testServer = new ApolloServer<AppContext>({ schema });

      // TODO: can we get response type from query string?
      type GetAllMovies = {
        getAllMovies: Movie[];
      };
      const query = queryBuilder
        .addParameter("limit", limit)
        .wantsInResponse("id", "name", "description")
        .build();

      // Act
      const response = await testServer.executeOperation<GetAllMovies>({
        query,
      });

      // Assert
      assert(response.body.kind === "single");
      expect(response.body.singleResult.data?.getAllMovies)
        .to.be.an("array")
        .to.have.lengthOf(movies.length)
        .to.containSubset(movies);
    }
  );

  test.each([
    [{ name: "Simple name", description: null }],
    [{ name: "Another name", description: "And the description" }],
  ])("createNewMovie should create a new movie", async (movie) => {
    // Arrange
    const schema = await buildSchema({
      resolvers: [MovieResolver],
    });
    const testServer = new ApolloServer<AppContext>({ schema });
    const queryBuilder = new MutationGraphQLQueryBuilder("createNewMovie");

    type CreateNewMovie = {
      createNewMovie: Movie;
    };

    // TODO: also test validation errors

    // Act
    const query = queryBuilder
      .addParameter("name", movie.name)
      .addParameter("description", movie.description)
      .wantsInResponse("name", "description")
      .build();

    const response = await testServer.executeOperation<CreateNewMovie>({
      query,
    });

    // Assert
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.createNewMovie).to.have.ownProperty(
      "name",
      movie.name
    );
    expect(response.body.singleResult.data?.createNewMovie).to.have.ownProperty(
      "description",
      movie.description
    );
  });
});
