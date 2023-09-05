import { Field, InputType } from "type-graphql";
import { Movie } from "./movie";

@InputType()
export class NewMovieInput implements Partial<Movie> {
  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class GetAllMoviesInput {
  @Field({ nullable: true })
  skip!: number;

  @Field()
  limit!: number;
}
