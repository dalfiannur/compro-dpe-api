import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Clinic from "App/Models/Clinic";
import StoreClinicValidator from "App/Validators/StoreClinicValidator";
import UpdateClinicValidator from "App/Validators/UpdateClinicValidator";

export default class ClinicsController {
  public async store({ request, response, auth }: HttpContextContract) {
    await auth.use("api").authenticate();

    const payload = await request.validate(StoreClinicValidator);

    try {
      const clinic = await Clinic.create(payload);
      return response.created({
        status: 201,
        message: "Clinic created successfully",
        data: clinic
      });
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: "Clinic not created",
        error
      });
    }
  }

  public async paginate({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 10 } = request.qs()

    const data = await Clinic.query().paginate(page, perPage);

    return response.ok({
      status: 200,
      message: "Clinics retrieved successfully",
      ...data.toJSON()
    })
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    await auth.use("api").authenticate();

    const payload = await request.validate(UpdateClinicValidator);

    const clinic = await Clinic.find(params.id);

    if (!clinic) {
      return response.notFound({
        status: 404,
        message: "Clinic not found"
      });
    }

    try {
      await clinic.merge(payload).save()
      return response.ok({
        status: 200,
        message: "Clinic updated successfully",
      })
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: "Clinic not updated",
      })
    }
  }

  public async delete({ auth, params, response }: HttpContextContract) {
    await auth.use("api").authenticate();

    const clinic = await Clinic.find(params.id);

    if (!clinic) {
      return response.notFound({
        status: 404,
        message: "Clinic not found"
      });
    }

    try {
      await clinic.delete()
      return response.ok({
        status: 200,
        message: "Clinic deleted successfully",
      })
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: "Clinic not deleted",
        error
      })
    }
  }
}
