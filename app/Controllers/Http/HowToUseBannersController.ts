import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ImageHelper from "App/Helpers/ImageHelper";
import Category from "App/Models/Category";
import HowToUseBanner from "App/Models/HowToUseBanner";
import StoreHowToUseBannerValidator from "App/Validators/StoreHowToUseBannerValidator";
import UpdateHowToUseBannerValidator from "App/Validators/UpdateHowToUseBannerValidator";

export default class HowToUseBannersController {
  public async store({ request, auth, response }: HttpContextContract) {
    await auth.use('api').authenticate()

    const payload = await request.validate(StoreHowToUseBannerValidator);

    const category = await Category.find(payload.categoryId)

    if (!category) {
      return response.notFound({
        status: 404,
        message: 'Category not found'
      })
    }

    try {
      const banners: HowToUseBanner[] = []
      for (const image of payload.images) {
        const banner = await HowToUseBanner.create({
          image_source: image,
          categoryId: category.id
        });
        banners.push(banner)
      }

      return response.created({
        status: 201,
        message: "Banner created successfully",
        data: banners
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

    const data = await HowToUseBanner.query().preload('category').paginate(page, perPage);

    return response.ok({
      status: 200,
      message: "Banners retrieved successfully",
      ...data.toJSON()
    })
  }

  public async update({ request, auth, response, params }: HttpContextContract) {
    await auth.use('api').authenticate()

    const payload = await request.validate(UpdateHowToUseBannerValidator);

    const banner = await HowToUseBanner.find(params.id);

    if (!banner) {
      return response.notFound({
        status: 404,
        message: "Banner not found"
      })
    }

    if (payload.image_source) {
      ImageHelper.delete(banner.image_source)
      banner.image_source = payload.image_source;
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

    const banner = await HowToUseBanner.find(params.id);

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

  public async getByCategoryId({ response, params }: HttpContextContract) {
    const category = await Category
      .query()
      .where('id', params.id)
      .preload('banners')
      .first()

    if (!category) {
      return response.notFound({
        status: 404,
        message: 'Category not found'
      })
    }
    const banners = category.banners
    return response.ok({
      status: 200,
      message: 'Banners retrieved successfully',
      data: banners
    })
  }
}
