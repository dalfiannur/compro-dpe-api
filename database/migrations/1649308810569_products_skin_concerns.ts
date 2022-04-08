import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductsSkinConcerns extends BaseSchema {
  protected tableName = 'products_skin_concerns'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('products')
      table.integer('skin_concern_id').unsigned()
      table.foreign('skin_concern_id').references('skin_concerns')

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
