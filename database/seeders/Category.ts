import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class CategorySeeder extends BaseSeeder {
  public async run() {

    const data = [
      {
        name: 'Repair',
        icon: "icons/repair.png"
      },
      {
        name: 'Prevent',
        icon: "icons/prevent.png"
      },
      {
        name: 'Glow',
        icon: "icons/glow.png"
      },
      {
        name: 'Hydrate',
        icon: "/images/hydrate.png"
      }
    ]

    await Category.createMany(data)
  }
}
