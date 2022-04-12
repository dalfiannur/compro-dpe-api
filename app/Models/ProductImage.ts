import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import { AssetHelper } from 'App/Helpers/AssetHelper'
import BaseModel from './BaseModel'

export default class ProductImage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @column()
  public imageSource: string

  @computed()
  public get imageSourceUrl() {
    return AssetHelper.getFullUrl(this.imageSource)
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
}
