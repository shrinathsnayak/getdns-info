/**
 * Extracts and validates a domain name from a string.
 * @param input The input string (possibly with protocol, path, etc.)
 * @returns The cleaned domain name if valid, otherwise null.
 */
export function extractAndValidateDomain(input: string): string | null {
  let domain = input.trim()
  domain = domain.replace(/^https?:\/\//i, '')
  domain = domain.split(/[/?#]/)[0]
  domain = domain.toLowerCase()
  const domainRegex = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z]{2,})+$/i
  if (!domainRegex.test(domain)) {
    return null
  }
  return domain
}
