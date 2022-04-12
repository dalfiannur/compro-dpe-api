/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  Route.post("login", "AuthController.login");
}).prefix('auth');

Route.group(() => {
  Route.get("/users", "UsersController.paginate");
  Route.post("/users", "UsersController.store");
  Route.put("/users/:id", "UsersController.update");
  Route.delete("/users/:id", "UsersController.delete");
});

Route.group(() => {
  Route.get("/main-banners", "MainBannersController.paginate");
  Route.post("/main-banners", "MainBannersController.store").middleware('UploadImage:imageSource');
  Route.put("/main-banners/:id", "MainBannersController.update").middleware('UploadImage:imageSource');
  Route.delete("/main-banners/:id", "MainBannersController.delete");
});

Route.group(() => {
  Route.get("/", "HowToUseBannersController.paginate");
  Route.post("/", "HowToUseBannersController.store").middleware('MultiUploadImage:images');
  Route.delete("/:id", "HowToUseBannersController.delete");
}).prefix('how-to-use-banners')

Route.group(() => {
  Route.get("/skin-types", "SkinTypesController.paginate");
  Route.post("/skin-types", "SkinTypesController.store");
  Route.put("/skin-types/:id", "SkinTypesController.update");
  Route.delete("/skin-types/:id", "SkinTypesController.delete");
});

Route.group(() => {
  Route.get("/clinics", "ClinicsController.paginate");
  Route.post("/clinics", "ClinicsController.store");
  Route.put("/clinics/:id", "ClinicsController.update");
  Route.delete("/clinics/:id", "ClinicsController.delete");
});

Route.group(() => {
  Route.get("/skin-concerns", "SkinConcernsController.paginate");
  Route.post("/skin-concerns", "SkinConcernsController.store");
  Route.put("/skin-concerns/:id", "SkinConcernsController.update");
  Route.delete("/skin-concerns/:id", "SkinConcernsController.delete");
});

Route.group(() => {
  Route.get('/', 'CategoriesController.show')
  Route.get('/:id/banners', 'HowToUseBannersController.getByCategoryId')
})
.prefix('/categories')

Route.group(() => {
  Route.get('/', 'ProductsController.paginate')
  Route.get('/:slug', 'ProductsController.findBySlug')
  Route.post('/', 'ProductsController.create').middleware('MultiUploadImage:images')
  Route.put('/:id', 'ProductsController.update')
  Route.delete('/:id', 'ProductsController.delete')

  Route.group(() => {
    Route.post('/', 'ProductsController.storeRelates')
    Route.delete('/:id', 'ProductsController.deleteRelates')
  }).prefix('/:productId/related')

  Route.group(() => {
    Route.group(() => {
      Route.post('/', 'ProductsController.storeImages').middleware('MultiUploadImage:images')
      Route.delete('/:id', 'ProductsController.deleteImage')
    }).prefix('/images')

    Route.group(() => {
      Route.post('/', 'ProductsController.storeSkinTypes')
      Route.delete('/:id', 'ProductsController.deleteSkinType')
    }).prefix('skin-types')

    Route.group(() => {
      Route.post('/', 'ProductsController.storeSkinConcerns')
      Route.delete('/:id', 'ProductsController.deleteSkinConcern')
    }).prefix('skin-concerns')
  }).prefix('/:productId')
})
.prefix('product')

Route.group(() => {
  Route.get('/', 'ArticlesController.show')
  Route.post('/', 'ArticlesController.create').middleware('UploadImage:thumbnail')
  Route.put('/:id', 'ArticlesController.update').middleware('UploadImage:thumbnail')
  Route.delete('/:id', 'ArticlesController.delete')
})
.prefix('article')

Route.group(() => {
  Route.get('/', 'TagsController.show')
  // Route.post('/', 'TagsController.create')
  Route.delete('/:id', 'TagsController.delete')
})
.prefix('tag')
