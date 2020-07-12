import { DeleteResult, Repository, FindManyOptions } from 'typeorm'
import pLimit from 'p-limit'
import { ObjectId } from 'bson'
export class GenericService<Entity, Dto> {

  constructor(
    protected readonly repository: Repository<Entity>,
  ) { }

  findById(id: string | ObjectId): Promise<Entity> {
    const transformed = typeof id === 'string' ? new ObjectId(id) : id
    return this.repository.findOne({ where: { _id: transformed } })
  }

  findByIds(ids: string[] | ObjectId[]): Promise<Entity[]> {
    const transform = (id: string | ObjectId) => typeof id === 'string' ? new ObjectId(id) : id
    // @ts-ignore
    return this.repository.find({ where: { _id: { $in: ids.map(transform) } } })
  }

  find(where: any, options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find({ where: { ...where }, ...options })
  }

  async getLast() {
    const order: any = { createdAt: 'DESC' }

    const [item] = await this.repository.find({
      take: 1,
      order,
    })
    return item
  }

  count(where: any): Promise<number> {
    return this.repository.count(where)
  }

  findOne(where: any): Promise<Entity> {
    return this.repository.findOne({ where: { ...where } })
  }

  create(data: Dto): Promise<Entity> {
    return this.repository.save(this.repository.create(data as Dto))
  }

  update(where: any, data: any) {
    return this.repository.update(where, data)
  }

  delete(where: any): Promise<DeleteResult> {
    return this.repository.delete(where)
  }

  async deleteMany(where: any): Promise<number> {
    const limitWrapper = pLimit(10)
    const promisess = []

    const items = await this.find(where)
    for (const i of items) {
      const { id }: any = i
      promisess.push(limitWrapper(() => this.delete({ id })))
    }
    await Promise.all(promisess)

    return items.length
  }
}
