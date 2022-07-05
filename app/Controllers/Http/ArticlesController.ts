import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ImageHelper from "App/Helpers/ImageHelper";
import Article from "App/Models/Article";
import Tag from "App/Models/Tag";
import ArticleValidator from "App/Validators/ArticleValidator";
import UpdateArticleValidator from "App/Validators/UpdateArticleValidator";
import Product from "../../Models/Product";
import AddProductRelationValidator from "../../Validators/AddProductRelationValidator";

export default class ArticlesController {
  public async create({ request, response, auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    const payload = await request.validate(ArticleValidator);

    const article = await Article.create({
      title: payload.title,
      userId: auth.user!.id,
      content: payload.content,
      thumbnail: payload.thumbnail,
      isFeatured: payload.isFeatured,
    });

    for (const i of payload.tags) {
      const tag = await Tag.firstOrCreate({ name: i });
      await article.related("tags").attach([tag.id]);
    }

    return response.created({
      status: 201,
      message: "Article created successfully",
      data: article.serialize(),
    });
  }

  public async update({ request, params, response }: HttpContextContract) {
    const payload = await request.validate(UpdateArticleValidator);
    const article = await Article.find(params.id);
    if (!article) {
      return response.notFound({
        status: 404,
        message: "Article not found",
      });
    }

    if (payload.thumbnail) {
      ImageHelper.delete(article.thumbnail);
    }

    try {
      await article.merge(payload).save();
      return response.ok({
        status: 200,
        message: "Article updated successfully",
        data: article.serialize(),
      });
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: "Article not updated",
        errors,
      });
    }
  }

  public async paginate({ request, response }: HttpContextContract) {
    const {
      page = 1,
      perPage = 10,
      orderBy = "created_at",
      orderSort = "desc",
      search,
    } = request.qs();

    const query = Article.query().preload("user");

    const allowedOrders = ["createdAt", "id", "title", "viewCount"];

    if (allowedOrders.includes(orderBy)) {
      query.orderBy(orderBy, orderSort);
    }

    if (search) {
      query.where("title", "like", `%${search}%`);
    }

    const news = await query.paginate(page, perPage);
    return response.ok({
      status: 200,
      message: "Articles paginated successfully",
      ...news.toJSON(),
    });
  }

  public async findBySlug({ params, response }: HttpContextContract) {
    const article = await Article.query()
      .preload("user")
      .preload("tags")
      .preload("products", (q) => {
        q
          .preload('images')
          .preload('category')
          .preload('skinConcerns')
          .preload('skinTypes')
      })
      .where("slug", params.slug)
      .first();

    if (!article) {
      return response.notFound({
        status: 404,
        message: "Article not found",
      });
    }

    article.merge({ viewCount: article.viewCount + 1 }).save();

    return response.ok({
      status: 200,
      message: "Article found",
      data: article,
    });
  }

  public async delete({ params, response, auth }: HttpContextContract) {
    await auth.use("api").authenticate();

    const article = await Article.find(params.id);

    if (!article) {
      return response.notFound({
        status: 404,
        message: "Article not found",
      });
    }

    try {
      await article.delete();
      return response.ok({
        status: 200,
        message: "Article deleted successfully",
      });
    } catch (errors) {
      return response.badRequest({
        status: 400,
        message: "Article not deleted",
        errors,
      });
    }
  }

  public async addProductRelation({
    params,
    response,
    request,
    auth,
  }: HttpContextContract) {
    await auth.use("api").authenticate();
    const payload = await request.validate(AddProductRelationValidator);
    const article = await Article.find(params.id);

    if (!article) {
      return response.notFound({
        status: 404,
        message: "Article not found",
      });
    }

    const products = await Product.query().whereIn('id', payload.productIds).exec();

    await article.related("products").attach(products.map((item) => item.id));

    return response.json({
      status: 200,
      message: "Product related to article",
    });
  }

  public async deleteProductRelation({
    params,
    response,
    request,
    auth,
  }: HttpContextContract) {
    await auth.use("api").authenticate();
    const article = await Article.find(params.id);

    if (!article) {
      return response.notFound({
        status: 404,
        message: "Article not found",
      });
    }

    const product = await Product.query().where('id', params.productId).first();

    if (product) {
      await article.related("products").detach([product.id])
    }

    return response.json({
      status: 200,
      message: "Product related to article",
    });
  }
}
