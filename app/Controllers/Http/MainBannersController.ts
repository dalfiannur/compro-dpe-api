import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ImageHelper from "App/Helpers/ImageHelper";
import MainBanner from "App/Models/MainBanner";
import StoreMainBannerValidator from "App/Validators/StoreMainBannerValidator";
import UpdateMainBannerValidator from "App/Validators/UpdateMainBannerValidator";

export default class MainBannersController {
  public async store({ request, auth, response }: HttpContextContract) {
    await auth.use('api').authenticate()

    const payload = await request.validate(StoreMainBannerValidator);

    try {
      const banner = await MainBanner.create(payload);
      return response.created({
        status: 201,
        message: "Banner created successfully",
        data: banner.serialize()
      })
    } catch (error) {
      return response.status(400).send({
        status: 400,
        message: "Banner not created",
        error
      })
    }
  }

  public async paginate({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 5 } = request.qs()

    const data = await MainBanner.query().paginate(page, perPage);

    return response.ok({
      status: 200,
      message: "Banners retrieved successfully",
      ...data.serialize()
    })
  }

  public async update({ request, auth, response, params }: HttpContextContract) {
    await auth.use('api').authenticate()

    const payload = await request.validate(UpdateMainBannerValidator);

    const banner = await MainBanner.find(params.id);

    if (!banner) {
      return response.notFound({
        status: 404,
        message: "Banner not found"
      })
    }

    if (payload.imageSource) {
      ImageHelper.delete(banner.imageSource)
      banner.imageSource = payload.imageSource;
    }

    try {
      await banner.merge(payload).save()

      return response.ok({
        status: 200,
        message: "Banner updated successfully",
      })
    } catch (error) {
      return response.status(400).send({
        status: 400,
        message: "Banner not updated",
        error
      })
    }
  }

  public async delete({ params, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const banner = await MainBanner.find(params.id);

    if (!banner) {
      return response.notFound({
        status: 404,
        message: "Banner not found"
      })
    }

    try {
      await banner.delete()
      return response.ok({
        status: 200,
        message: "Banner deleted successfully"
      })
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: "Banner not deleted",
      })
    }
  }
}
