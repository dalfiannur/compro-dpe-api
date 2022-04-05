import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MainBanner from "App/Models/MainBanner";
import StoreMainBannerValidator from "App/Validators/StoreMainBannerValidator";
import UpdateMainBannerValidator from "App/Validators/UpdateMainBannerValidator";

export default class MainBannersController {
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(StoreMainBannerValidator);
    const user = await MainBanner.create(payload);
    return user;
  }
  public async paginate({ request }: HttpContextContract) {
    const page = request.qs().page || 1;
    const perPage = request.qs().per_page || 10;
    const search = request.qs().search || "";
    const data = await MainBanner.query()
      .where("name", "like", search)
      .paginate(page, perPage);
    return data;
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateMainBannerValidator);
    const user = await MainBanner.findOrFail(payload);

    await user.save();
  }

  public async delete(request, params: HttpContextContract) {
    const id = request.params("id");
    const user = await MainBanner.findOrFail(id);
    await user.delete();
  }
}
