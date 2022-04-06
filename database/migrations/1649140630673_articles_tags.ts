import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ArticlesTags extends BaseSchema {
  protected tableName = 'articles_tags'
 
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.integer('articles_id').unsigned()
      table.foreign('articles_id').references('articles.id')
      table.integer('tags_id').unsigned()
      table.foreign('tag_id').references('tags.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
