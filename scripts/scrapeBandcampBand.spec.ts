import { test } from '@playwright/test'
import { getDoc, getRowCount, getRows } from '../src/utilities/google.utils'
import { scrapeBandcampBand } from '../src/utilities/playwright.utils'

// See here how to get started:
// https://playwright.dev/docs/intro
test('scrape and add bandcamp artist to db', async ({ page, context }) => {
  test.slow()

  const doc = await getDoc()
  const rowCount = await getRowCount(doc)
  const { rowsRaw } = await getRows(doc, 0, rowCount)
  const badncampLink =
    process.env['BANDCAMP_LINK_TO_SCRAPE'] ||
    'https://speedmasterrecords.bandcamp.com/track/rock-like-this'

  await scrapeBandcampBand({
    page,
    context,
    bandcampLink: badncampLink,
    rowsRaw,
    addIfMissing: true,
    doc
  })

  return
})
