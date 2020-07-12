import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GenericService } from 'modules/generic/generic.service'
import { MatchEntity } from './match.entity'
import { MatchDto } from './dto/match.dto'

@Injectable()
export class MatchService extends GenericService<MatchEntity, MatchDto> {

  constructor(
  ) {
    super(
      null,
    )
  }
}
