import { DateTime } from "luxon";
import { column, computed } from "@ioc:Adonis/Lucid/Orm";
import { AssetHelper } from "App/Helpers/AssetHelper";
import BaseModel from "./BaseModel";

export default class MainBanner extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public imageSource: string;

  @computed()
  public get imageSourceUrl() {
    return AssetHelper.getFullUrl(this.imageSource);
  }

  @column()
  public title: string;

  @column()
  public subTitle: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
