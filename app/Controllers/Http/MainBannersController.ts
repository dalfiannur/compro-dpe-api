import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MainBanner from "App/Models/MainBanner";
import StoreMainBannerValidator from "App/Validators/StoreMainBannerValidator";

export default class MainBannersController {
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(StoreMainBannerValidator);
    const user = await MainBanner.create(payload);
    return user;
  }
  public async paginate({ request }: HttpContextContract) {
    const page = request.qs().page || 1;
    const perPage = request.qs().per_page || 10;
    const data = await MainBanner.query().paginate(page, perPage);
    return data;
  }

  public async findbyId(ctx: HttpContextContract) {
    const user = await MainBanner.find(1);
  }

  public async update({ request }: HttpContextContract) {
    const user = await MainBanner.findOrFail(1);

    await user.save();
  }

  public async delete(ctx: HttpContextContract) {
    const user = await MainBanner.findOrFail(1);
    await user.delete();
  }
}
