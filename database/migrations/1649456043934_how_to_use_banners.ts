import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class HowToUseBanners extends BaseSchema {
  protected tableName = 'how_to_use_banners'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("image_source").notNullable();
      table.integer('category_id').unsigned()
      table.string("title").nullable();
      table.string("sub_title").nullable();

      table.foreign('category_id').references('id').inTable('categories')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
