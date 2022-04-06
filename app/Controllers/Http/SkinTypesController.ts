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
    const data = await SkinType.query().paginate(page, perPage);
    return data;
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateSkinTypeValidator);
    const user = await SkinType.findOrFail(1);

    await user.save();
  }

  public async delete(ctx: HttpContextContract) {
    const user = await SkinType.findOrFail(1);
    await user.delete();
  }
}
