import express from 'express'
import { setupRoutes } from '#routes/index.route.js'
import { setupMiddlewares } from '#middlewares/setupMiddlewares.js'

const port = process.env.PORT ?? '9001'

const createServer = () => {
  const app = express()

  setupMiddlewares(app)
  setupRoutes(app)

  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}

export default createServer;
