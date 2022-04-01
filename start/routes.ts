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

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/', 'CategoriesController.show')

  Route.get('/:slug', 'CategoriesController.findBySlug')

  Route.post('/', 'CategoriesController.store')

  // Route.put('/:id', 'CategoriesController.update') 

  Route.delete('/:id', 'CategoriesController.delete')

  // Route.post('/findcategory', 'CategoriesController.findCategory')
})
.prefix('/category')

Route.group(() => {
  Route.get('/', 'ProductsController.show')

  Route.post('/', 'ProductsController.create')

  Route.put('/:id', 'ProductsController.update')

  Route.delete('/:id', 'ProductsController.delete')
})
.prefix('product')