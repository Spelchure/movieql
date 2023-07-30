import { MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Movie {
  @Field((_) => ID)
  id!: string;

  @Field()
  @MaxLength(30)
  name!: string;

  @Field({ nullable: true })
  description?: string;
}
