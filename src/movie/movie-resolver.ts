import { Query, Resolver } from "type-graphql";
import { Movie } from "./movie";

@Resolver()
export class MovieResolver {
  @Query((_) => [Movie])
  public async getAllMovies() {
    return [];
  }
}
