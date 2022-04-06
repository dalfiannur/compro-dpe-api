import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SkinType from "App/Models/SkinType";
import StoreSkinTypeValidator from "App/Validators/StoreSkinTypeValidator";
import UpdateSkinTypeValidator from "App/Validators/UpdateSkinTypeValidator";

export default class SkinTypesController {
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(StoreSkinTypeValidator);
    const user = await SkinType.create(payload);
    return user;
  }
  public async paginate({ request }: HttpContextContract) {
    const page = request.qs().page || 1;
    const perPage = request.qs().per_page || 10;
    const search = request.qs().search || "";
    const data = await SkinType.query()
      .where("name", "like", search)
      .paginate(page, perPage);
    return data;
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateSkinTypeValidator);
    const user = await SkinType.findOrFail(payload);

    await user.save();
  }

  public async delete({ request }: HttpContextContract) {
    const id = request.param("id");
    const user = await SkinType.findOrFail(id);
    await user.delete();
  }
}
