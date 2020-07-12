import { ObjectType, Field } from '@nestjs/graphql';
import { ObjectId } from 'bson';

@ObjectType()
export class UserDto {
  @Field()
  name: string
}

@ObjectType()
export class MatchDto {
  @Field()
  level: number

  @Field()
  time: number

  @Field(() => String)
  user: ObjectId

  @Field()
  userConnection: UserDto
}
