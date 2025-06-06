// Description: This module provides various functions to retrieve and manipulate domain-related information.

// Node module to handle various domain-related operations
import tls from 'tls'
import dns from 'dns/promises'
import { exec } from 'child_process'
import utils from 'util'
const execPromise = utils.promisify(exec)

// External libraries
import axios from 'axios'
import puppeteer from 'puppeteer'

// Internal Imports
import { CrtShEntry } from '#types/index.js'
import { getDomainAgeFromWhoIs, parseWhois } from '#utils/whois.util.js'

/**
 * The function `getARecord` retrieves the A record for a given domain using DNS resolution in
 * TypeScript.
 * @param {string} domain - The `domain` parameter in the `getARecord` function is a string that
 * represents the domain for which you want to retrieve the A record.
 * @returns The function `getARecord` is returning the resolved IPv4 address (A record) for the
 * specified domain.
 */
export const getARecord = async (domain: string) => {
  try {
    return await dns.resolve4(domain)
  } catch (error) {
    throw new Error('Failed to retrieve A record')
  }
}

/**
 * This TypeScript function retrieves the AAAA record for a given domain using async/await syntax.
 * @param {string} domain - The `domain` parameter in the `getAAAARecord` function is a string
 * representing the domain for which you want to retrieve the AAAA record.
 * @returns The function `getAAAARecord` is returning the AAAA record for the specified domain after
 * resolving it using the `dns.resolve6` method.
 */
export const getAAAARecord = async (domain: string) => {
  try {
    return await dns.resolve6(domain)
  } catch (error) {
    throw new Error('Failed to retrieve AAAA record')
  }
}

/**
 * The function `getMXRecord` retrieves the MX record for a given domain using async/await syntax in
 * TypeScript.
 * @param {string} domain - The `domain` parameter in the `getMXRecord` function is a string
 * representing the domain for which you want to retrieve the MX (Mail Exchange) record.
 * @returns The `getMXRecord` function is returning the MX (Mail Exchange) record for the specified
 * domain by using the `dns.resolveMx` method. If successful, it will return the MX record. If there is
 * an error during the process, it will throw an error message stating 'Failed to retrieve MX record'.
 */
export const getMXRecord = async (domain: string) => {
  try {
    return await dns.resolveMx(domain)
  } catch (error) {
    throw new Error('Failed to retrieve MX record')
  }
}

/**
 * The function `getTXTRecord` retrieves the TXT record for a given domain using async/await syntax in
 * TypeScript.
 * @param {string} domain - The `domain` parameter in the `getTXTRecord` function is a string that
 * represents the domain for which you want to retrieve the TXT record. This function is designed to
 * asynchronously fetch the TXT record for the specified domain using the `dns.resolveTxt` method. If
 * successful, it will return the
 * @returns The `getTXTRecord` function is returning the TXT record for the specified domain. If
 * successful, it will return the TXT record data as an array. If there is an error in retrieving the
 * TXT record, it will throw an error with the message 'Failed to retrieve TXT record'.
 */
export const getTXTRecord = async (domain: string) => {
  try {
    return await dns.resolveTxt(domain)
  } catch (error) {
    throw new Error('Failed to retrieve TXT record')
  }
}

/**
 * This TypeScript function retrieves the CNAME record for a given domain using the dns.resolveCname
 * method.
 * @param {string} domain - The `domain` parameter in the `getCNAMERecord` function is a string that
 * represents the domain for which you want to retrieve the CNAME (Canonical Name) record.
 * @returns The function `getCNAMERecord` is returning the CNAME record for the specified domain after
 * resolving it using the `dns.resolveCname` method.
 */
export const getCNAMERecord = async (domain: string) => {
  try {
    return await dns.resolveCname(domain)
  } catch (error) {
    throw new Error('Failed to retrieve CNAME record')
  }
}

/**
 * This TypeScript function retrieves the NS record for a given domain using async/await syntax.
 * @param {string} domain - The `domain` parameter in the `getNSRecord` function is a string that
 * represents the domain for which you want to retrieve the NS (Name Server) record. This function uses
 * the `dns.resolveNs` method to asynchronously resolve the NS record for the specified domain. If
 * successful, it returns
 * @returns The function `getNSRecord` is returning the result of resolving the NS (Name Server) record
 * for the provided domain using the `dns.resolveNs` method.
 */
export const getNSRecord = async (domain: string) => {
  try {
    return await dns.resolveNs(domain)
  } catch (error) {
    throw new Error('Failed to retrieve NS record')
  }
}

/**
 * The function `getSOARecord` retrieves the Start of Authority (SOA) record for a given domain using
 * async/await syntax in TypeScript.
 * @param {string} domain - The `domain` parameter in the `getSOARecord` function is a string
 * representing the domain for which you want to retrieve the Start of Authority (SOA) record.
 * @returns The function `getSOARecord` is returning the SOA (Start of Authority) record for the
 * specified domain after resolving it using the `dns.resolveSoa` method.
 */
export const getSOARecord = async (domain: string) => {
  try {
    return await dns.resolveSoa(domain)
  } catch (error) {
    throw new Error('Failed to retrieve SOA record')
  }
}

/**
 * The function `getDKIMRecord` retrieves the DKIM record for a given domain using TypeScript and
 * returns it as a string.
 * @param {string} domain - The `getDKIMRecord` function is designed to retrieve the DKIM record for a
 * given domain. The `domain` parameter is a string representing the domain for which you want to
 * retrieve the DKIM record.
 * @returns The function `getDKIMRecord` returns the DKIM record for the specified domain if found, or
 * 'No DKIM record found' if no record is found. If the DKIM lookup fails, it throws an error with the
 * message 'DKIM lookup failed'.
 */
export const getDKIMRecord = async (domain: string) => {
  try {
    const records = await dns.resolveTxt(`default._domainkey.${domain}`)
    return records.flat().join(' ') || 'No DKIM record found'
  } catch {
    throw new Error('DKIM lookup failed')
  }
}

/**
 * The function `getSPFRecord` retrieves the SPF record for a given domain using DNS resolution in
 * TypeScript.
 * @param {string} domain - The `domain` parameter is a string representing the domain for which you
 * want to retrieve the SPF (Sender Policy Framework) record.
 * @returns The function `getSPFRecord` returns the SPF record for the specified domain if found, or
 * 'No SPF record found' if no SPF record is found. If an error occurs during the SPF lookup process,
 * it throws an error with the message 'SPF lookup failed'.
 */
export const getSPFRecord = async (domain: string) => {
  try {
    const records = await dns.resolveTxt(domain)
    return (
      records.flat().find((record) => record.startsWith('v=spf')) ||
      'No SPF record found'
    )
  } catch {
    throw new Error('SPF lookup failed')
  }
}

/**
 * The function `getDMARCRecord` retrieves the DMARC record for a given domain using TypeScript and
 * returns it as a string.
 * @param {string} domain - The `domain` parameter in the `getDMARCRecord` function is a string
 * representing the domain for which you want to retrieve the DMARC record.
 * @returns The function `getDMARCRecord` returns the DMARC record for the specified domain if found,
 * or 'No DMARC record found' if no record is found. If the DMARC lookup fails, it throws an error with
 * the message 'DMARC lookup failed'.
 */
export const getDMARCRecord = async (domain: string) => {
  try {
    const records = await dns.resolveTxt(`_dmarc.${domain}`)
    return records.flat().join(' ') || 'No DMARC record found'
  } catch {
    throw new Error('DMARC lookup failed')
  }
}

/**
 * The function `getTraceRedirects` in TypeScript retrieves and returns a list of redirects for a given
 * domain.
 * @param {string} domain - The `getTraceRedirects` function takes a `domain` parameter of type string.
 * This function is designed to trace redirects for a given domain by making HTTP requests and
 * following the redirect chain until there are no more redirects or a maximum number of redirects is
 * reached.
 * @returns The `getTraceRedirects` function returns an array of URLs representing the redirects
 * followed when trying to access the provided domain.
 */
export const getTraceRedirects = async (domain: string) => {
  try {
    let redirects = []
    let url = `https://${domain}`
    while (url) {
      const response = await axios.get(url, { maxRedirects: 10 })
      url = response.headers.location
      if (url) redirects.push(url)
    }
    return redirects
  } catch (error) {
    throw new Error('Failed to retrieve trace redirects')
  }
}

/**
 * The function `getScreenshot` uses Puppeteer to take a screenshot of a specified domain in a headless
 * browser environment.
 * @param {string} domain - The `domain` parameter in the `getScreenshot` function is a string
 * representing the domain for which you want to capture a screenshot. It should be a valid domain name
 * (e.g., "example.com") that you want to load in a browser and take a screenshot of.
 * @returns The function `getScreenshot` returns a base64 encoded screenshot of the specified domain
 * after taking a screenshot of the webpage using Puppeteer.
 */
export const getScreenshot = async (domain: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1280,800',
    ],
    defaultViewport: { width: 1280, height: 800 },
  })

  try {
    const page = await browser.newPage()
    await page.goto(`https://${domain}`, {
      waitUntil: 'networkidle2',
      timeout: 15000,
    })
    const screenshot = await page.screenshot({
      encoding: 'base64',
      type: 'jpeg',
      quality: 70,
    })
    await page.close()
    return screenshot
  } finally {
    await browser.close()
    throw new Error('Failed to take screenshot')
  }
}

/**
 * The function `getPerformanceMetrics` uses Lighthouse to analyze the performance metrics of a given
 * domain and returns the results as a Promise.
 * @param {string} domain - The `getPerformanceMetrics` function you provided is a Node.js function
 * that uses Lighthouse to gather performance metrics for a given domain. The function takes a `domain`
 * parameter, which is a string representing the domain for which you want to measure performance
 * metrics.
 * @returns The `getPerformanceMetrics` function returns a Promise that resolves with the performance
 * metrics obtained from running Lighthouse on the specified domain. The performance metrics are parsed
 * from the JSON output of Lighthouse and returned as an object. If there are any errors during the
 * Lighthouse execution or parsing of the output, the function will return `null`.
 */
export const getPerformanceMetrics = (domain: string) => {
  return new Promise((resolve) => {
    exec(
      `npx lighthouse https://${domain} --quiet --output=json --output-path=stdout --chrome-flags="--headless --no-sandbox --disable-gpu"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error('Lighthouse error:', error)
          console.error('Lighthouse stderr:', stderr)
          return resolve(null)
        }
        if (!stdout) {
          console.error('Lighthouse produced no output.')
          console.error('Lighthouse stderr:', stderr)
          return resolve(null)
        }

        const firstBrace = stdout.indexOf('{')
        const lastBrace = stdout.lastIndexOf('}')
        if (firstBrace === -1 || lastBrace === -1) return resolve(null)

        const jsonString = stdout.slice(firstBrace, lastBrace + 1)

        try {
          const result = JSON.parse(jsonString)
          resolve(result)
        } catch (e) {
          console.error('Error parsing Lighthouse output:', e)
          resolve(null)
        }
      }
    )
  })
}

/**
 * The function `getSslCertificateInfo` fetches the SSL certificate information for a given domain
 * using a TLS connection.
 * @param {string} domain - The `domain` parameter is a string representing the domain name for which
 * you want to fetch the SSL certificate information.
 * @returns The `getSslCertificateInfo` function returns a Promise that resolves with the SSL
 * certificate information for the specified domain.
 */
export const getSslCertificateInfo = async (domain: string) => {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(443, domain, { servername: domain }, () => {
      const cert = socket.getPeerCertificate()
      socket.end()
      resolve(cert)
    })

    socket.on('error', () => reject('SSL certificate fetch failed'))
  })
}

/**
 * The function `getHttpHeaders` asynchronously fetches the HTTP headers of a specified domain using
 * axios in TypeScript.
 * @param {string} domain - The `domain` parameter in the `getHttpHeaders` function is a string that
 * represents the domain for which you want to fetch the HTTP headers. It should be a valid domain name
 * (e.g., "example.com").
 * @returns The function `getHttpHeaders` is returning the HTTP headers of the specified domain after
 * making a HEAD request to the domain using axios. If successful, it returns the headers object. If
 * there is an error during the request, it throws an error with the message 'Failed to fetch HTTP
 * headers'.
 */
export const getHttpHeaders = async (domain: string) => {
  try {
    const response = await axios.head(`https://${domain}`)
    return response.headers
  } catch {
    throw new Error('Failed to fetch HTTP headers')
  }
}

/**
 * The function `getSecurityHeaders` fetches security headers from a specified domain using axios in
 * TypeScript.
 * @param {string} domain - The `getSecurityHeaders` function you provided is an asynchronous function
 * that fetches security headers from a given domain using Axios. It extracts specific security headers
 * from the response headers and returns them in an object.
 * @returns The function `getSecurityHeaders` returns an object containing security headers for a given
 * domain. The object includes headers like 'Strict-Transport-Security', 'Content-Security-Policy',
 * 'X-Frame-Options', 'X-Content-Type-Options', and 'Referrer-Policy'. The function fetches these
 * headers from the specified domain using an HTTP HEAD request and returns only the headers that are
 * present in the response. If the request fails, it throws an error with the message 'Failed to fetch
 * security headers'.
 */
export const getSecurityHeaders = async (domain: string) => {
  try {
    const response = await axios.head(`https://${domain}`)
    const securityHeaders = [
      'Strict-Transport-Security',
      'Content-Security-Policy',
      'X-Frame-Options',
      'X-Content-Type-Options',
      'Referrer-Policy',
    ]
    return securityHeaders.reduce(
      (acc: Record<string, string>, header) => {
        if (response.headers[header.toLowerCase()]) {
          acc[header] = response.headers[header.toLowerCase()]
        }
        return acc
      },
      {} as Record<string, string>
    )
  } catch {
    throw new Error('Failed to fetch security headers')
  }
}

/**
 * The function `getRobotsInfo` asynchronously fetches and returns the content of the robots.txt file
 * for a specified domain using Axios in TypeScript.
 * @param {string} domain - The `domain` parameter in the `getRobotsInfo` function is a string that
 * represents the domain name from which the robots.txt file will be fetched.
 * @returns The function `getRobotsInfo` is returning the content of the `robots.txt` file fetched from
 * the specified domain.
 */
export const getRobotsInfo = async (domain: string) => {
  try {
    const { data } = await axios.get(`https://${domain}/robots.txt`)
    return data
  } catch {
    throw new Error('Failed to fetch robots.txt')
  }
}

/**
 * The function `getSitemapInfo` fetches the sitemap.xml file from a specified domain using axios in
 * TypeScript.
 * @param {string} domain - The `domain` parameter in the `getSitemapInfo` function is a string
 * representing the domain for which you want to fetch the sitemap information.
 * @returns The function `getSitemapInfo` is returning the data fetched from the sitemap.xml file of
 * the specified domain.
 */
export const getSitemapInfo = async (domain: string) => {
  try {
    const { data } = await axios.get(`https://${domain}/sitemap.xml`)
    return data
  } catch {
    throw new Error('Failed to fetch sitemap.xml')
  }
}

/**
 * The function `getSubdomains` fetches subdomains for a given domain using the crt.sh API.
 * @param {string} domain - The `getSubdomains` function takes a `domain` parameter as input. This
 * parameter should be a string representing the domain for which you want to retrieve subdomains. For
 * example, if you want to find subdomains for the domain "example.com", you would pass "example.com"
 * as the
 * @returns The function `getSubdomains` returns an array of subdomains fetched from the CRT.SH API for
 * the specified domain. If successful, it returns an array of subdomains. If there is an error during
 * the fetch operation, it throws an error with the message 'Failed to fetch subdomains'.
 */
export const getSubdomains = async (domain: string) => {
  try {
    const { data } = await axios.get(
      `https://crt.sh/?q=%25.${domain}&output=json`
    )
    const subdomains = [
      ...new Set((data as CrtShEntry[]).map((entry) => entry.name_value)),
    ]
    return subdomains
  } catch {
    throw new Error('Failed to fetch subdomains')
  }
}

/**
 * The function `getWhoisInfo` asynchronously retrieves WHOIS information for a given domain and
 * returns the parsed result.
 * @param {string} domain - The `domain` parameter in the `getWhoisInfo` function is a string that
 * represents the domain name for which you want to perform a WHOIS lookup.
 * @returns The `getWhoisInfo` function is returning the parsed WHOIS information for the specified
 * domain after performing a WHOIS lookup. If the WHOIS lookup fails, it will throw an error with the
 * message 'WHOIS lookup failed'.
 */
export const getWhoisInfo = async (domain: string) => {
  try {
    const { stdout } = await execPromise(`whois ${domain}`)
    return parseWhois(stdout)
  } catch {
    throw new Error('WHOIS lookup failed')
  }
}

/**
 * The function `getDomainAge` retrieves the creation date of a domain using the `whois` command and
 * extracts the domain age from the output.
 * @param {string} domain - The `getDomainAge` function takes a domain name as a parameter and uses the
 * `whois` command to retrieve information about the domain, specifically the "Creation Date" field.
 * The function then extracts the creation date information and returns the domain age.
 * @returns The `getDomainAge` function is returning the age of the domain extracted from the output of
 * the `whois` command for the specified domain.
 */
export const getDomainAge = async (domain: string) => {
  try {
    const { stdout } = await execPromise(
      `whois ${domain} | grep -i "Creation Date"`
    )
    return getDomainAgeFromWhoIs(stdout)
  } catch {
    throw new Error('domain age lookup failed')
  }
}
