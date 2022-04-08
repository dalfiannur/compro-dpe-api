import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RelatedProducts extends BaseSchema {
  protected tableName = 'related_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.integer('product_1').unsigned()
      table.foreign('product_1').references('products.id')
      table.integer('product_2').unsigned()
      table.foreign('product_2').references('products.id')

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
