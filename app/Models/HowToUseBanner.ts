import { DateTime } from "luxon";
import { BelongsTo, belongsTo, column, computed } from "@ioc:Adonis/Lucid/Orm";
import Category from "./Category";
import { AssetHelper } from "App/Helpers/AssetHelper";
import BaseModel from "./BaseModel";

export default class HowToUseBanner extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public categoryId: number;

  @column()
  public imageSource: string;

  @computed()
  public get imageSourceUrl() {
    return AssetHelper.getFullUrl(this.imageSource);
  }

  @column()
  public title?: string;

  @column()
  public subTitle?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;
}
