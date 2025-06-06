/**
 * The function `parseWhois` takes a raw WHOIS data string and parses it into a key-value object where
 * keys are WHOIS fields and values are corresponding data.
 * @param {string} raw - A string containing raw WHOIS data that needs to be parsed into key-value
 * pairs. The function `parseWhois` splits the raw data by lines and then parses each line to extract
 * key-value pairs. The function returns an object where keys are the parsed keys and values are either
 * strings or arrays of
 * @returns The `parseWhois` function returns a Record object where the keys are strings and the values
 * are either strings or arrays of strings.
 */
export const parseWhois = (raw: string): Record<string, string | string[]> => {
  const lines = raw.split('\n')
  const result: Record<string, string | string[]> = {}
  for (const line of lines) {
    const idx = line.indexOf(':')
    if (idx > 0) {
      const key = line.slice(0, idx).trim()
      const value = line.slice(idx + 1).trim()
      if (key && value) {
        if (result[key]) {
          if (Array.isArray(result[key])) {
            ;(result[key] as string[]).push(value)
          } else {
            result[key] = [result[key] as string, value]
          }
        } else {
          result[key] = value
        }
      }
    }
  }
  return result
}

/**
 * The function `getDomainAgeFromWhoIs` extracts the creation date of a domain from a WHOIS response
 * and calculates the age in years, months, and total days.
 * @param {string} creationDateStr - The `getDomainAgeFromWhoIs` function takes a `creationDateStr`
 * parameter, which is a string representing the creation date of a domain obtained from a WHOIS
 * lookup. The function parses this string to extract the creation date, calculates the age of the
 * domain in years, months, and
 * @returns The function `getDomainAgeFromWhoIs` returns an object with the following properties:
 * - `years`: Number of years since the domain was created
 * - `months`: Number of months since the domain was created
 * - `totalDays`: Total number of days since the domain was created
 * - `registeredOn`: Date object representing the creation date of the domain
 */
export const getDomainAgeFromWhoIs = (creationDateStr: string) => {
  if (!creationDateStr) return null

  const lines = creationDateStr
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  let dateValue: string | null = null
  for (const line of lines) {
    const match = line.match(/:\s*(.+)$/)
    if (match && match[1]) {
      dateValue = match[1].trim()
      break
    }
  }

  if (!dateValue) return null

  const creationDate = new Date(dateValue)
  if (isNaN(creationDate.getTime())) return null

  const now = new Date()
  const diffMs = now.getTime() - creationDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  let years = now.getFullYear() - creationDate.getFullYear()
  let months = now.getMonth() - creationDate.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  return {
    years,
    months,
    totalDays: diffDays,
    registeredOn: creationDate,
  }
}
