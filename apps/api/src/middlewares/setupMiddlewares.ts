// Description: This file sets up middlewares for the Express application.

import helmet from 'helmet'
import compression from 'compression'

export const setupMiddlewares = (app: any) => {
  app.use(helmet())
  app.use(compression())
}
