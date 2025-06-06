import { Response } from 'express'

/**
 * The function `sendSuccess` sends a successful response with data and an optional message in a
 * TypeScript application.
 * @param {Response} res - The `res` parameter in the `sendSuccess` function is typically the response
 * object that is used to send a response back to the client in an HTTP request. It is commonly used in
 * web development with frameworks like Express.js in Node.js to send JSON responses to client
 * requests.
 * @param {T} data - The `data` parameter in the `sendSuccess` function is the main data that you want
 * to send back as a response. It can be of any type, as the function is defined as a generic function
 * with type `<T>`. This allows you to specify the type of data being passed to
 * @param {string} [message] - The `message` parameter in the `sendSuccess` function is an optional
 * parameter of type `string`. It allows you to include an additional message along with the success
 * response. If a message is provided when calling the function, it will be included in the JSON
 * response.
 */
export function sendSuccess<T>(res: Response, data: T, message?: string): void {
  res.status(200).json({
    success: true,
    scanDate: new Date().toISOString(),
    data,
    ...(message && { message }),
  })
}

/**
 * The function `sendError` sends an error response with a specified message and status code to the
 * client.
 * @param {Response} res - The `res` parameter in the `sendError` function is of type `Response`, which
 * is typically the response object in an Express.js application. This object represents the HTTP
 * response that an Express app sends when it receives an HTTP request.
 * @param {string} error - The `error` parameter in the `sendError` function is a string that
 * represents the error message or description that you want to send back in the response when an error
 * occurs.
 * @param {number} [code] - The `code` parameter in the `sendError` function is an optional parameter
 * that represents the HTTP status code to be sent in the response. If a `code` is provided, it will be
 * used as the status code for the response. If not provided, the default status code of 400
 */
export function sendError(res: Response, error: string, code?: number): void {
  res.status(code || 400).json({
    success: false,
    scanDate: new Date().toISOString(),
    error,
    ...(code && { code }),
  })
}
