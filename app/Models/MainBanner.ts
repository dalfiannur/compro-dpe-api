import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class MainBanner extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public image_source: string;

  @column()
  public title: string;

  @column()
  public sub_title: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
