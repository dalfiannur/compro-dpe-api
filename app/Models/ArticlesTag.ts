import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Article from './Article'
import Tag from './Tag'

export default class ArticlesTag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public articleId: number

  @column()
  public tagId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Article)
  public article: BelongsTo<typeof Article>

  @belongsTo(() => Tag)
  public tag: BelongsTo<typeof Tag>
}
