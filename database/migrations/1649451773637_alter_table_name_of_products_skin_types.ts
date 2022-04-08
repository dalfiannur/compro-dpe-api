import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTableNameOfProductsSkinTypes extends BaseSchema {
  protected tableName = 'alter_table_name_of_products_skin_types'

  public async up () {
    this.schema.renameTable('products_skin_types', 'product_skin_type')
  }

  public async down () {
    this.schema.renameTable('product_skin_type', 'products_skin_types')
  }
}
