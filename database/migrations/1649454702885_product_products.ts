import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductProducts extends BaseSchema {
  protected tableName = 'product_product'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('product_1').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('product_2').unsigned().references('id').inTable('products').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
