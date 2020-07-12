import { Args, Mutation, Resolver, Context, Query, ResolveProperty, Parent, Int, ResolveField } from '@nestjs/graphql'
import { MatchEntity } from './match.entity';
import { MatchDto, UserDto } from './dto/match.dto';

@Resolver(of => MatchEntity)
export class MatchResolver {
  constructor(
  ) { }

  @Mutation(returns => Boolean)
  public finishSingleMatch(
    @Context() context,
    @Args({ name: 'level', type: () => Int }) level: number,
    @Args({ name: 'time', type: () => Int }) time: number,
  ) {

    return true
  }

  @Query(returns => [MatchDto])
  public singleMatchsLeaderBoards(
  ) {
    return [
      {
        level: 1,
        time: 2,
        user: 'id',
      },
      {
        level: 11,
        time: 22,
        user: 'idid',
      }
    ]
  }

  @ResolveField(returns => UserDto) // ERROR
  userConnection(@Parent() match: MatchDto) {
    console.log(match)
    const { user } = match
    return `fakename: ${user}`
  }

}
