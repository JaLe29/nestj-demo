import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { MatchResolver } from 'modules/match/match.resolver'
import { MatchModule } from 'modules/match/match.module'

const GraphQLDefinition = GraphQLModule.forRoot({
  context: ({ req, connection }) => {
    // subscriptions
    if (connection) {
      return { req: connection.context }
    }

    // queries and mutations
    return { req }
  },

  autoSchemaFile: './test.gql',
  installSubscriptionHandlers: true,
  path: '/graphql',
  playground: true,
  typePaths: [],
})

@Module({
  imports: [
    GraphQLDefinition,
    MatchModule,
  ],
  providers: [
    MatchResolver,
  ],
})
export class GraphqlModule { }
