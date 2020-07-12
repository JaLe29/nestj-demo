# install
yarn

# run
yarn start

# problem
The problem is in match.resolevr.ts

```
  @ResolveField(returns => UserDto)
  userConnection(@Parent() match: MatchDto) {
    console.log(match)
    const { user } = match
    return `fakename: ${user}`
  }
```