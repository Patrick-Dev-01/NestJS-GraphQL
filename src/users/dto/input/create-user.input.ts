import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  @IsNotEmpty()
  age: number;
}
