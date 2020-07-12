import { Entity, Column } from 'typeorm'
import { GenericEntity } from '../generic/generic.entity'
import { ObjectId } from 'bson'

@Entity()
export class MatchEntity extends GenericEntity {
  @Column()
  level: number

  @Column()
  time: number

  @Column({ type: 'jsonb' })
  user: ObjectId
}
