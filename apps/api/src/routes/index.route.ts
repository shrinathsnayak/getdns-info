// Description: This file sets up the routes for the API by importing and using routes.
import domainRoute from './domain.route.js'
import healthRoute from './health.route.js'

/**
 * The `setupRoutes` function configures routes for a given Express app by using the `healthRoute` and
 * `domainRoute`.
 * @param {any} app - The `app` parameter in the `setupRoutes` function is typically an instance of an
 * Express application. It is used to define and configure routes for the application.
 */
export const setupRoutes = (app: any) => {
  app.use(healthRoute)
  app.use(domainRoute)
}
