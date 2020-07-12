import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { MatchEntity } from './match.entity'
import { MatchService } from './match.service'
// import { UsersModule } from 'modules/users/users.module'

@Module({
  imports: [
    // TypeOrmModule.forFeature([MatchEntity]),
  ],
  providers: [MatchService],
  exports: [MatchService],
})

export class MatchModule { }
