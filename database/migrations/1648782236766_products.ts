import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').unsigned()
      table.string('name')
      table.string('slug')
      table.foreign('category_id').references('categories.id')
      table.string('sku')
      table.text('description')
      table.string('used_as')
      table.string('how_to_use')
      table.string('keyingredient')
      table.boolean('is_featured')

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
