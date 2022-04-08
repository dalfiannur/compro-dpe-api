import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Category from "./Category";

export default class HowToUseBanner extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public categoryId: number;

  @column()
  public image_source: string;

  @column()
  public title?: string;

  @column()
  public sub_title?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;
}
