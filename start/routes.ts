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
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
});

Route.group(() => {
  Route.get("/users", "UsersController.paginate");
  Route.get("/users/:id", "UsersController.findbyId");
  Route.post("/users", "UsersController.store");
  Route.put("/users/:id", "UsersController.update");
  Route.delete("/users/:id", "UsersController.delete");
});

Route.group(() => {
  Route.get("/main-banners", "MainBannersController.paginate");
  Route.post("/main-banners", "MainBannersController.store");
  Route.put("/main-banners:id", "MainBannersController.update");
  Route.delete("/main-banners/:id", "MainBannersController.delete");
});

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
