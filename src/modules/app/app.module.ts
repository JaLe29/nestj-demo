import { Module, forwardRef } from '@nestjs/common'
import { GraphqlModule } from '../graphql/graphql.module'
import { connection } from '../../utils/typeOrmConnection'

@Module({
  controllers: [
  ],
  imports: [
    // connection,
    GraphqlModule,
  ],
})
export class AppModule { }
