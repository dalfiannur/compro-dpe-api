import { BaseModel as Base } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'

export default class BaseModel extends Base {
  public static namingStrategy = new CamelCaseNamingStrategy()
}
