import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Clinics extends BaseSchema {
  protected tableName = "clinics";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name", 250).notNullable();
      table.string("address", 250).notNullable();
      table.string("latitude");
      table.string("longitude");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
