import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Clinic from "App/Models/Clinic";
import StoreClinicValidator from "App/Validators/StoreClinicValidator";
import UpdateClinicValidator from "App/Validators/UpdateClinicValidator";

export default class ClinicsController {
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(StoreClinicValidator);
    const user = await Clinic.create(payload);
    return user;
  }
  public async paginate({ request }: HttpContextContract) {
    const page = request.qs().page || 1;
    const perPage = request.qs().per_page || 10;
    const data = await Clinic.query().paginate(page, perPage);
    return data;
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateClinicValidator);
    const user = await Clinic.findOrFail(1);

    await user.save();
  }

  public async delete(ctx: HttpContextContract) {
    const user = await Clinic.findOrFail(1);
    await user.delete();
  }
}
