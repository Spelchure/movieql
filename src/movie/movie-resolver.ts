import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { Movie } from "./movie";
import * as MovieInputs from "./movie-inputs";
import { prisma } from "@/db";

@Resolver()
export class MovieResolver {
  @Query((_) => [Movie])
  public async getAllMovies(
    @Arg("data") paginationData: MovieInputs.GetAllMoviesInput
  ) {
    const skip = paginationData.skip ?? 0;
    const take = paginationData.limit;

    const allMovies = await prisma.movie.findMany({ skip, take });
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
