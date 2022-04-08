import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTableArticleColumnContents extends BaseSchema {
  protected tableName = 'articles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('content').alter()
    })
  }

  public async down () {

  }
}
