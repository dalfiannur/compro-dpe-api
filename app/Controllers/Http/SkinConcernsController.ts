import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SkinConcern from "App/Models/SkinConcern";
import StoreSkinConcernValidator from "App/Validators/StoreSkinConcernValidator";
import UpdateSkinConcernValidator from "App/Validators/UpdateSkinConcernValidator";

export default class SkinConcernsController {
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(StoreSkinConcernValidator);
    const user = await SkinConcern.create(payload);
    return user;
  }
  public async paginate({ request }: HttpContextContract) {
    const page = request.qs().page || 1;
    const perPage = request.qs().per_page || 10;
    const data = await SkinConcern.query().paginate(page, perPage);
    return data;
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateSkinConcernValidator);
    const user = await SkinConcern.findOrFail(1);

    await user.save();
  }

  public async delete(ctx: HttpContextContract) {
    const user = await SkinConcern.findOrFail(1);
    await user.delete();
  }
}
