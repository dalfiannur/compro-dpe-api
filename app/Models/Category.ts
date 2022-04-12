import { DateTime } from 'luxon'
import { column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import HowToUseBanner from './HowToUseBanner'
import { AssetHelper } from 'App/Helpers/AssetHelper'
import BaseModel from './BaseModel'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name'],
    allowUpdates: true
  })
  public slug: string

  @column()
  public icon: string

  @computed()
  public get iconUrl() {
    return AssetHelper.getFullUrl(this.icon)
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => HowToUseBanner)
  public banners: HasMany<typeof HowToUseBanner>
}
