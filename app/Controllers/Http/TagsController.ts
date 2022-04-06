import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import TagValidator from 'App/Validators/TagValidator'

export default class TagsController {
    public async create({request}: HttpContextContract){
        const payload = await request.validate(TagValidator)
        const tag = await Tag.create(payload)
        return tag
    }

    public async show({request}: HttpContextContract){
        const page = request.qs().page || 1
        const pageLimit = request.qs().pageLimit || 5
        const tag = await Tag.query().paginate(page, pageLimit)
        return tag
    }

    public async delete({params, response}: HttpContextContract){
        const tag = await Tag.find(params.id)

        if (!tag){
            return response.notFound('Tag not found')
        }
        
        await tag.delete()
        return 'deleted'
    }
}
