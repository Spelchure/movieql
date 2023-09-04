import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { Movie } from "./movie";
import * as MovieInputs from "./movie-inputs";
import { prisma } from "@/db";

@Resolver()
export class MovieResolver {
  @Query((_) => [Movie])
  public async getAllMovies() {
    const allMovies = await prisma.movie.findMany();
    return allMovies;
  }
  @Mutation((_) => Movie)
  public async createNewMovie(
    @Arg("data") newMovieData: MovieInputs.NewMovieInput
  ) {
    const createdMovie = await prisma.movie.create({
      data: {
        name: newMovieData.name,
        description: newMovieData.description,
      },
    });
    return createdMovie;
  }
}
