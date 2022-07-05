import { DateTime } from 'luxon'
import { afterDelete, beforeDelete, BelongsTo, belongsTo, column, computed, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import User from './User'
import Tag from './Tag'
import ImageHelper from 'App/Helpers/ImageHelper'
import BaseModel from './BaseModel'
import { AssetHelper } from 'App/Helpers/AssetHelper'
import Product from './Product'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public title: string;

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
    allowUpdates: true
  })
  public slug: string;

  @column()
  public content: string;

  @column()
  public thumbnail: string;

  @column()
  public viewCount: number;

  @computed()
  public get thumbnailUrl() {
    return AssetHelper.getFullUrl(this.thumbnail)
  }

  @column()
  public isFeatured: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @manyToMany(() => Tag)
  public tags: ManyToMany<typeof Tag>;

  @manyToMany(() => Product)
  public products: ManyToMany<typeof Product>

  @beforeDelete()
  public static async beforeDeleteHook(article: Article) {
    const tags = await article.related('tags').query().exec()
    await article.related('tags').detach(tags.map((tag) => tag.id))
  }

  @afterDelete()
  public static afterDeleteHook(article: Article) {
    ImageHelper.delete(article.thumbnail)
  }
}
