import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTableArticles extends BaseSchema {
  protected tableName = 'articles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('view_count').defaultTo(0);
    })
  }

  public async down () {
    // this.schema.dropTable(this.tableName)
  }
}
