// Description: Middleware to check for a domain in the request query

import { Request, Response, NextFunction } from 'express'
import { sendError } from '#utils/response.js'
import { extractAndValidateDomain } from '#utils/domainUtils.js'

/**
 * The domainQueryMiddleware function checks for a domain in the request query and sends an error
 * response if it is missing.
 * @param {Request} req - The `req` parameter in the `domainQueryMiddleware` function stands for the
 * request object in Express.js. It contains information about the HTTP request made by the client,
 * such as the request headers, query parameters, body, and more.
 * @param {Response} res - The `res` parameter in the `domainQueryMiddleware` function stands for the
 * response object in Express.js. It is used to send a response back to the client making the request.
 * You can use methods like `res.send()`, `res.json()`, `res.status()`, etc., to
 * @param {NextFunction} next - The `next` parameter in the `domainQueryMiddleware` function is a
 * callback function that is used to pass control to the next middleware function in the stack. When
 * called, it will execute the next middleware function in the chain. This allows you to chain multiple
 * middleware functions together in your application.
 * @returns The `sendError` function is being called with the parameters `res`, `'Missing domain in
 * query'`, and `400`.
 */
export function domainQueryMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let rawDomain = (req.query.domain as string)?.trim()
  if (!rawDomain) {
    return sendError(res, 'Missing domain in query', 400)
  }
  const domain = extractAndValidateDomain(rawDomain)

  if (!domain) {
    return sendError(res, 'Invalid domain name', 400)
  }

  ;(req as any).domain = domain
  next()
}
