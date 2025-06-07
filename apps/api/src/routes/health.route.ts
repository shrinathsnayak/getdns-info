// Description: This file defines the health check route for the API.

import { Router, Response, Router as ExpressRouter } from 'express'
import { getHealth } from '#controllers/health.controller.js'
import { sendError, sendSuccess } from '#utils/response.js'

const healthRoute: ExpressRouter = Router()

healthRoute.get('/_health', (_, res: Response) => {
  try {
    const response = getHealth()
    sendSuccess(res, response)
  } catch (error) {
    sendError(res, 'Failed to retrieve health status', 500)
  }
})

export default healthRoute
