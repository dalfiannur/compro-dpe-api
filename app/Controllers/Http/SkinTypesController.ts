import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SkinType from "App/Models/SkinType";
import StoreSkinTypeValidator from "App/Validators/StoreSkinTypeValidator";
import UpdateSkinTypeValidator from "App/Validators/UpdateSkinTypeValidator";

export default class SkinTypesController {
  public async store({ request, auth, response }: HttpContextContract) {
    await auth.use("api").authenticate();

    const payload = await request.validate(StoreSkinTypeValidator);

    try {
      const skinType = await SkinType.create(payload);
      return response.created({
        status: 201,
        message: "Skin type created successfully",
        data: skinType
      });
    } catch (error) {
      return response.status(400).send({
        status: 400,
        message: "Skin type not created",
        error
      });
    }
  }

  public async paginate({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 10 } = request.qs()

    const data = await SkinType.query().paginate(page, perPage);

    return response.ok({
      status: 200,
      message: "Skin types retrieved successfully",
      ...data.toJSON()
    })
  }

  public async update({ request, auth, response }: HttpContextContract) {
    await auth.use("api").authenticate();

    const payload = await request.validate(UpdateSkinTypeValidator);

    const skinType = await SkinType.find(payload);

    if (!skinType) {
      return response.notFound({
        status: 404,
        message: "Skin type not found"
      });
    }

    try {
      await skinType.merge(payload).save()
      return response.ok({
        status: 200,
        message: "Skin type updated successfully",
      })
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: "Skin type not updated",
      })
    }
  }

  public async delete({ response, params, auth }: HttpContextContract) {
    await auth.use("api").authenticate();

    const banner = await SkinType.find(params.id);

    if (!banner) {
      return response.notFound({
        status: 404,
        message: "Skin type not found"
      });
    }

    try {
      await banner.delete()
      return response.ok({
        status: 200,
        message: "Skin type deleted successfully",
      })
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: "Skin type not deleted",
      })
    }
  }
}
