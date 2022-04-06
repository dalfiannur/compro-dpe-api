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
    const search = request.qs().search || "";
    const data = await User.query()
      .where("name", "like", search)
      .paginate(page, perPage);
    return data;
  }

  public async findbyId({ request }: HttpContextContract) {
    const id = request.param("id");
    const user = await User.find(id);
    return user;
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateValidator);
    const user = await User.findOrFail(payload);
    await user.save();
  }

  public async delete({ request }: HttpContextContract) {
    const id = request.param("id");
    const user = await User.findOrFail(id);
    await user.delete();
  }
}
