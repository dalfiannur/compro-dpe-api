import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SkinConcern from "App/Models/SkinConcern";
import StoreSkinConcernValidator from "App/Validators/StoreSkinConcernValidator";
import UpdateSkinConcernValidator from "App/Validators/UpdateSkinConcernValidator";

export default class SkinConcernsController {
  public async store({ request, response, auth }: HttpContextContract) {
    await auth.use("api").authenticate();

    const payload = await request.validate(StoreSkinConcernValidator);

    try {
      const skinConcern = await SkinConcern.create(payload);
      return response.created({
        status: 201,
        message: "Skin concern created successfully",
        data: skinConcern
      });
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: "Skin concern not created",
        error
      });
    }
  }

  public async paginate({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 10 } = request.qs()

    const data = await SkinConcern.query().paginate(page, perPage);

    return response.ok({
      status: 200,
      message: "Skin concerns retrieved successfully",
      ...data.toJSON()
    })
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    await auth.use("api").authenticate();

    const payload = await request.validate(UpdateSkinConcernValidator);

    const skinConcern = await SkinConcern.find(params.id);

    if (!skinConcern) {
      return response.notFound({
        status: 404,
        message: "Skin concern not found"
      });
    }

    try {
      await skinConcern.merge(payload).save()
      return response.ok({
        status: 200,
        message: "Skin concern updated successfully",
      })
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: "Skin concern not updated",
      })
    }
  }

  public async delete({ params, response, auth }: HttpContextContract) {
    await auth.use("api").authenticate();

    const skinConcern = await SkinConcern.find(params.id);

    if (!skinConcern) {
      return response.notFound({
        status: 404,
        message: "Skin concern not found"
      });
    }

    try {
      await skinConcern.delete()
      return response.ok({
        status: 200,
        message: "Skin concern deleted successfully",
      })
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: "Skin concern not deleted",
        error
      })
    }
  }
}
