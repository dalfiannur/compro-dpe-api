import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductsSkinTypes extends BaseSchema {
  protected tableName = 'products_skin_types'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('products')
      table.integer('skin_type_id').unsigned()
      table.foreign('skin_type_id').references('skin_types')

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
