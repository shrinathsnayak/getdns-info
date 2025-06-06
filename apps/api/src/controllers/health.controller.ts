// Description: Health check controller for the API

/**
 * The `getHealth` function returns an object with uptime, message, and timestamp properties.
 * @returns An object is being returned with three properties: uptime, message, and timestamp. The
 * uptime property contains the result of the process.uptime() function, the message property is set to
 * 'OK', and the timestamp property contains the current timestamp using Date.now().
 */
export const getHealth = () => {
  return {
    message: 'OK',
    timestamp: Date.now(),
    uptime: process.uptime(),
  }
}
