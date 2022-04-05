import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
// import Database from "@ioc:Adonis/Lucid/Database";
import StoreValidator from "App/Validators/StoreValidator";
import UpdateValidator from "App/Validators/UpdateValidator";

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(StoreValidator);
    const user = await User.create(payload);
    return user;
  }

  public async paginate({ request }: HttpContextContract) {
    const page = request.qs().page || 1;
    const perPage = request.qs().per_page || 10;
    const data = await User.query().paginate(page, perPage);
    return data;
  }

  public async findbyId(ctx: HttpContextContract) {
    const user = await User.find(1);
  }

  public async update({ request }: HttpContextContract) {
    const user = await User.findOrFail(1);
    const payload = await request.validate(UpdateValidator);
    await user.save();
  }

  public async delete(ctx: HttpContextContract) {
    const user = await User.findOrFail(1);
    await user.delete();
  }
}
