// Description: Domain-related routes for handling various DNS and domain information requests.

import { Router, Request, Response, Router as ExpressRouter } from 'express'
import { sendError, sendSuccess } from '#utils/response.js'
import { domainQueryMiddleware } from '#middlewares/domainQueryMiddleware.js'
import {
  getARecord,
  getAAAARecord,
  getMXRecord,
  getTXTRecord,
  getCNAMERecord,
  getNSRecord,
  getSOARecord,
  getTraceRedirects,
  getScreenshot,
  getPerformanceMetrics,
  getSslCertificateInfo,
  getHttpHeaders,
  getSecurityHeaders,
  getSPFRecord,
  getDKIMRecord,
  getDMARCRecord,
  getRobotsInfo,
  getSitemapInfo,
  getSubdomains,
  getWhoisInfo,
  getDomainAge,
} from '#controllers/domain.controller.js'

const domainRoute: ExpressRouter = Router()

// Description: Middleware to check for a domain in the request query
domainRoute.use(domainQueryMiddleware)

domainRoute.get('/a', async (req: Request, res: Response) => {
  const domain = (req as any).domain
  try {
    const response = await getARecord(domain)
    sendSuccess(res, { domain: domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve A record', 500)
  }
})

domainRoute.get('/aaaa', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getAAAARecord(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve AAAA record', 500)
  }
})

domainRoute.get('/mx', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getMXRecord(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve MX record', 500)
  }
})

domainRoute.get('/txt', async (req: Request, res: Response) => {
  const domain = (req as any).domain
  try {
    const response = await getTXTRecord(domain)
    sendSuccess(res, { domain, response: response.flat() })
  } catch (error) {
    sendError(res, 'Failed to retrieve TXT record', 500)
  }
})

domainRoute.get('/cname', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getCNAMERecord(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve CNAME record', 500)
  }
})

domainRoute.get('/ns', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getNSRecord(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve NS record', 500)
  }
})

domainRoute.get('/soa', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getSOARecord(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve SOA record', 500)
  }
})

domainRoute.get('/redirects', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getTraceRedirects(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve trace redirects', 500)
  }
})

domainRoute.get('/screenshot', async (req: Request, res: Response) => {
  const domain = (req as any).domain
  try {
    const response = await getScreenshot(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to take screenshot', 500)
  }
})

domainRoute.get('/performance', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getPerformanceMetrics(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve performance metrics', 500)
  }
})

domainRoute.get('/ssl', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getSslCertificateInfo(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve SSL certificate info', 500)
  }
})

domainRoute.get('/http-headers', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getHttpHeaders(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve HTTP headers', 500)
  }
})

domainRoute.get('/security-headers', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getSecurityHeaders(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve security headers', 500)
  }
})

domainRoute.get('/spf', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getSPFRecord(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve SPF record', 500)
  }
})

domainRoute.get('/dkim', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getDKIMRecord(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve DKIM record', 500)
  }
})

domainRoute.get('/dmarc', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getDMARCRecord(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve DMARC record', 500)
  }
})

domainRoute.get('/robots', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getRobotsInfo(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve robots.txt', 500)
  }
})

domainRoute.get('/sitemap', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getSitemapInfo(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve sitemap.xml', 500)
  }
})

domainRoute.get('/subdomains', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getSubdomains(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve subdomains', 500)
  }
})

domainRoute.get('/whois', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getWhoisInfo(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve WHOIS information', 500)
  }
})

domainRoute.get('/age', async (req: Request, res: Response) => {
  const domain = (req as any).domain

  try {
    const response = await getDomainAge(domain)
    sendSuccess(res, { domain, response })
  } catch (error) {
    sendError(res, 'Failed to retrieve domain age information', 500)
  }
})

export default domainRoute
