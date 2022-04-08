import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
// import Database from "@ioc:Adonis/Lucid/Database";
import StoreValidator from "App/Validators/StoreValidator";
import UpdateValidator from "App/Validators/UpdateValidator";

export default class UsersController {
  public async store({ request, response, auth }: HttpContextContract) {
    await auth.use("api").authenticate();

    const payload = await request.validate(StoreValidator);

    try {
      const user = await User.create(payload);
      return response.created({
        status: 201,
        message: 'User created successfully',
        data: user
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'User not created',
        errors
      })
    }
  }

  public async paginate({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 10, search = null } = request.qs()

    const data = User.query()

    if (search) {
      data.where("name", "like", `%${search}%`)
    }

    const result = await data.paginate(page, perPage);

    return response.ok({
      status: 200,
      message: 'success',
      data: result
    })
  }

  public async findbyId({ request }: HttpContextContract) {
    const id = request.param("id");
    const user = await User.find(id);
    return user;
  }

  public async update({ request, auth, params, response }: HttpContextContract) {
    await auth.use('api').authenticate()

    const payload = await request.validate(UpdateValidator);
    const user = await User.find(params.id);

    if (!user) {
      return response.notFound({
        status: 404,
        message: 'User not found',
      })
    }

    try {
      await user.merge(payload).save();
      return response.ok({
        status: 200,
        message: 'User updated successfully',
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'User not updated',
        errors
      })
    }
  }

  public async delete({ auth, response, params }: HttpContextContract) {
    await auth.use('api').authenticate()

    const user = await User.find(params.id);

    if (!user) {
      return response.notFound({
        status: 404,
        message: 'User not found',
      })
    }

    try {
      await user.delete();
      return response.ok({
        status: 200,
        message: 'User deleted successfully',
      })
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: 'User not deleted',
        errors
      })
    }
  }
}
