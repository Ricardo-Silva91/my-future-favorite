import { type Page, type BrowserContext, expect } from '@playwright/test'
import type { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'

export const scrapeBandcampBand = async ({
  page,
  context,
  bandcampLink,
  rowsRaw,
  addIfMissing,
  doc
}: {
  page: Page
  context: BrowserContext
  bandcampLink: string
  rowsRaw: GoogleSpreadsheetRow<Record<string, any>>[]
  addIfMissing: boolean
  doc: GoogleSpreadsheet
}) => {
  const numberOfAlbumsToCheck = parseInt(process.env['NUMBER_OF_BC_ALBUMS_TO_CHECK'] || '3', 10)

  // console.log({ bandcampLink })

  if (!bandcampLink) {
    throw new Error('no band provided')
  }

  const bandDomainRex = new RegExp('https://[0-9a-zA-Z-_]+.bandcamp.com', 'g')
  const match = bandcampLink.match(bandDomainRex)

  if (!match || !match.length) {
    throw new Error('provided link is not correct')
  }

  const albumsUrl = `${match[0]}/music`

  console.log({ bandcampLink, match, albumsUrl })

  await page.goto(albumsUrl)

  const albumElems = page.locator('.music-grid-item.square > a')

  try {
    await albumElems.first().waitFor({ state: 'visible', timeout: 3000 })
  } catch (error) {
    expect(await albumElems.count()).toBeGreaterThan(0)
  }

  const numberOfAlbums = await albumElems.count()

  const albumsToCheck =
    numberOfAlbums > numberOfAlbumsToCheck ? numberOfAlbumsToCheck : numberOfAlbums
  let recentSales = 0
  let recentAlbums = [] as any[]

  for (let i = 0; i < albumsToCheck; i++) {
    const element = await albumElems.nth(i)
    const href = await element.getAttribute('href')
    const resolvedHref = `${match[0]}${href}`

    if (resolvedHref) {
      const albumPage = await context.newPage()

      await albumPage.goto(resolvedHref)

      const elemToCheck = albumPage.locator('#collect-anchor')
      try {
        await elemToCheck.waitFor({ state: 'attached', timeout: 3000 })
      } catch (error: any) {
        console.log({ resolvedHref })
        throw new Error(error)
      }

      const titleElem = await albumPage.locator('#name-section > .trackTitle')
      const title = await titleElem.innerText()

      const coverElem = await albumPage.locator('#tralbumArt img')
      const cover = await coverElem.getAttribute('src')

      const tagElems = await albumPage.locator('.tralbumData > a')
      const tagElemsCount = await tagElems.count()
      let tags: string[] = []

      for (let i = 0; i < tagElemsCount; i++) {
        const element = await tagElems.nth(i)
        const innerText = await element.innerText()
        tags.push(innerText)
      }

      const albumSales = albumPage.locator('.collected-by .thumb')
      const moreThumbsButton = albumPage.locator('.more-thumbs')

      // console.log({ c: await moreThumbsButton.count() })

      let noMoreThumbsExist =
        (await moreThumbsButton.count()) === 0 ||
        (await moreThumbsButton.first().getAttribute('style')) === 'display: none;'

      while (!noMoreThumbsExist) {
        await moreThumbsButton.click()
        await page.waitForTimeout(3000)

        noMoreThumbsExist =
          (await moreThumbsButton.count()) === 0 ||
          (await moreThumbsButton.first().getAttribute('style')) === 'display: none;'
      }

      recentSales = recentSales + (await albumSales.count())

      recentAlbums.push({
        name: title,
        coverUrl: cover,
        tags,
        url: resolvedHref,
        external_url: ''
      })

      await albumPage.close()
    }
  }

  const nameElem = await page.locator('#band-name-location > .title')
  const name = await nameElem.innerText()

  const coverElem = await page.locator('#bio-container .band-photo')
  const cover = await coverElem.getAttribute('src')

  const artistTags = recentAlbums.reduce((acc, album) => [...acc, ...album.tags], [])

  // console.log({
  //   recentSales,
  //   url: match[0],
  //   name,
  //   recentAlbums,
  //   tags: artistTags,
  //   profilePicUrl: cover
  // })

  const foundRow = rowsRaw.find(
    (row) => row.get('url') === match[0] || row.get('url') === bandcampLink
  )

  if (foundRow) {
    await foundRow.assign({
      recentSales,
      url: match[0],
      name,
      recentAlbums: JSON.stringify(recentAlbums),
      tags: JSON.stringify(artistTags),
      app: 'bandcamp',
      profilePicUrl: cover?.replace('_21', '_5') || '',
      popularityScore: '',
      numberOfFollowers: '',
      external_url: '',
      uri: ''
    })

    await foundRow.save()
  } else if (addIfMissing) {
    console.log(`Adding ${name} to db`)
    const sheet = doc.sheetsByIndex[0]

    await sheet.addRow({
      recentSales,
      url: match[0],
      name,
      recentAlbums: JSON.stringify(recentAlbums),
      tags: JSON.stringify(artistTags),
      app: 'bandcamp',
      profilePicUrl: cover?.replace('_21', '_5') || ''
    })
  } else {
    console.log(`${name} not found`)
  }
}
