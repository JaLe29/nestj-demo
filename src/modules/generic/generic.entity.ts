import { Entity, Column, ObjectIdColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import { ObjectId } from 'bson'

@Entity()
export class GenericEntity {
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  isDeleted: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
