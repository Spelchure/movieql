import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { Movie } from "./movie";
import * as MovieInputs from "./movie-inputs";

@Resolver()
export class MovieResolver {
  @Query((_) => [Movie])
  public async getAllMovies() {
    return [];
  }
  @Mutation((_) => String)
  public async createNewMovie(
    @Arg("data") newMovieData: MovieInputs.NewMovieInput
  ) {
    throw Error("Not implemented exception");
  }
}
