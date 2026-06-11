import { chromium } from 'playwright'

const baseUrl = process.env.ROUTE_AUDIT_BASE_URL || 'http://127.0.0.1:8080'

const sections = [
  { listing: '/insights', prefix: '/insights/', expectedH1: ['From pilot to platform', 'The quiet economics', 'The CFO agenda', 'Building a resilient supply chain', 'The board conversation', 'Change that sticks'] },
  { listing: '/case-studies', prefix: '/case-studies/', expectedH1: ['Core banking modernization', 'Doubling surgical throughput', 'Building a resilient supply chain', 'Omnichannel reinvention', 'Grid modernization', 'Network redesign'] },
  { listing: '/industries', prefix: '/industries/', expectedH1: ['Financial Services', 'Healthcare & Life Sciences', 'Manufacturing & Industrial', 'Consumer & Retail', 'Energy & Utilities', 'Logistics & Transportation'] },
  { listing: '/services', prefix: '/services/', expectedH1: ['Strategy Consulting', 'Operations Excellence', 'Digital Transformation', 'Financial Advisory', 'Risk & Compliance', 'People & Change'] },
  { listing: '/team', prefix: '/team/', expectedH1: ['Elena Mercado', 'Daniel Okafor', 'Sophia Laurent', 'Marcus Tan', 'Amara Johnson', 'Rohan Patel', 'Isabela Cruz', 'Henry Blake'] },
  { listing: '/careers', prefix: '/careers/', expectedH1: ['Senior Consultant, Strategy', 'Manager, Digital & AI', 'Associate, Operations', 'Principal, Financial Advisory'] },
]

const normalize = (value) => value.replace(baseUrl, '').replace(/\?.*$/, '')

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()

const results = []

for (const section of sections) {
  await page.goto(`${baseUrl}${section.listing}`, { waitUntil: 'networkidle' })
  const listingH1 = (await page.locator('h1').first().textContent())?.trim() || ''
  const hrefs = await page.locator(`a[href^="${section.prefix}"]`).evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href')).filter(Boolean))])

  if (!hrefs.length) {
    throw new Error(`No detail links found on listing ${section.listing}`)
  }

  const firstHref = hrefs[0]
  await page.click(`a[href="${firstHref}"]`)
  await page.waitForLoadState('networkidle')
  const clickedUrl = normalize(page.url())
  if (clickedUrl !== firstHref) throw new Error(`Click navigation mismatch for ${section.listing}: expected ${firstHref}, got ${clickedUrl}`)
  await page.goBack({ waitUntil: 'networkidle' })
  if (normalize(page.url()) !== section.listing) throw new Error(`Back navigation failed for ${section.listing}`)

  for (const href of hrefs) {
    await page.goto(`${baseUrl}${href}`, { waitUntil: 'networkidle' })
    const detailH1 = (await page.locator('h1').first().textContent())?.trim() || ''
    const bodyText = (await page.locator('body').textContent())?.trim() || ''
    if (!detailH1) throw new Error(`Blank detail page at ${href}`)
    if (detailH1 === listingH1) throw new Error(`Detail page reused listing H1 at ${href}`)
    if (bodyText.length < 80) throw new Error(`Insufficient rendered content at ${href}`)
    if (!section.expectedH1.some((token) => detailH1.includes(token))) {
      throw new Error(`Unexpected detail H1 at ${href}: ${detailH1}`)
    }

    await page.reload({ waitUntil: 'networkidle' })
    const reloadH1 = (await page.locator('h1').first().textContent())?.trim() || ''
    if (reloadH1 !== detailH1) throw new Error(`Refresh changed page content at ${href}`)
  }

  results.push({ listing: section.listing, count: hrefs.length, status: 'ok' })
}

await browser.close()
console.log(JSON.stringify({ baseUrl, results }, null, 2))