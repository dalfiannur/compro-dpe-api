import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTableNameOfProductsSkinConcerns extends BaseSchema {
  protected tableName = 'alter_table_name_of_products_skin_concerns'

  public async up () {
    this.schema.renameTable('products_skin_concerns', 'product_skin_concern')
  }

  public async down () {
    this.schema.renameTable('product_skin_concern', 'products_skin_concerns')
  }
}
