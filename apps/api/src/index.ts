import express from 'express'
import dotenv from 'dotenv'
import { setupRoutes } from '#routes/index.route.js'
import { setupMiddlewares } from '#middlewares/setupMiddlewares.js'

dotenv.config()

const app = express()
const port = process.env.PORT ?? '9001'

setupMiddlewares(app)
setupRoutes(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
