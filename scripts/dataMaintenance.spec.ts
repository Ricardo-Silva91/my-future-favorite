import { test } from '@playwright/test'
import { getDoc, getRowCount, getRows } from '../src/utilities/google.utils'
import { getSpotifyToken } from '../src/utilities/spotify.utils'
import { scrapeBandcampBand } from '../src/utilities/playwright.utils'
import { fetchAlbumsFromArtist, fetchArtistsData } from '../src/utilities/fetchers'

const skipSpotify = false

// See here how to get started:
// https://playwright.dev/docs/intro
test('perform data maintenance', async ({ page, context }) => {
  test.slow()

  const doc = await getDoc()
  // const sheet = doc.sheetsByIndex[0]
  const rowCount = await getRowCount(doc)
  const { rowsRaw } = await getRows(doc, 0, rowCount)

  const spotifyArtists = rowsRaw.filter((row) => row.get('app') === 'spotify')
  const bandcampArtists = rowsRaw.filter((row) => row.get('app') === 'bandcamp')

  if (!skipSpotify) {
    // Update Spotify Artists
    console.log(`updating ${spotifyArtists.length} spotify artists`)

    const spotifyToken = await getSpotifyToken()
    const resolvedSpotifyArtists = spotifyArtists.map((artist: any) => ({
      id: artist.get('uri').replace('spotify:artist:', ''),
      app: 'spotify'
    }))

    const artistsData = await fetchArtistsData(spotifyToken, resolvedSpotifyArtists)

    await Promise.all(
      artistsData.map(async (artist) => {
        const artistAlbums = await fetchAlbumsFromArtist(spotifyToken, artist.id)

        const updatedArtist = {
          url: artist.href,
          external_url: artist.external_urls.spotify,
          name: artist.name,
          app: 'spotify',
          popularityScore: artist.popularity,
          numberOfFollowers: artist.followers.total,
          tags: JSON.stringify(artist.genres),
          profilePicUrl: artist.images[0].url,
          recentSales: 0,
          recentAlbums: JSON.stringify(
            artistAlbums.map((album) => ({
              name: album.name,
              coverUrl: album.images[0].url,
              tags: [],
              url: album.href,
              external_url: album.external_urls.spotify
            }))
          ),
          uri: artist.uri
        }

        const artistRow = rowsRaw.find((row) => row.get('url') === updatedArtist.url)

        if (artistRow) {
          await artistRow.assign(updatedArtist)
          await artistRow.save()
        }

        return updatedArtist
      })
    )
  }

  // Update Bandcamp Artists
  console.log(`updating ${bandcampArtists.length} bandcamp artists`)

  await page.goto('https://bandcamp.com/')

  await Promise.all(
    bandcampArtists.slice(0, 100).map(async (artist) => {
      const artistPage = await context.newPage()

      await scrapeBandcampBand({
        page: artistPage,
        context,
        bandcampLink: artist.get('url'),
        rowsRaw,
        addIfMissing: false,
        doc
      })

      return artist
    })
  )
})
