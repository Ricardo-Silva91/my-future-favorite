import { test } from '@playwright/test'
// import { getDoc, getRowCount, getRows } from '../src/utilities/google.utils'
import artists from '../src/assets/artists'
import { fetchAlbumsFromArtist, fetchArtistsData } from '../src/utilities/fetchers'
import { getSpotifyToken } from '../src/utilities/spotify.utils'

// See here how to get started:
// https://playwright.dev/docs/intro
test('migrate local data to google sheets', async ({ page, context }) => {
  test.slow()

  const token = await getSpotifyToken()
  const artistsData = await fetchArtistsData(token, artists)

  const artistObjects = await Promise.all(
    artistsData.map(async (artist) => {
      const artistAlbums = await fetchAlbumsFromArtist(token, artist.id)

      return {
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
    })
  )

  // await sheet.addRows(artistObjects)
  return
})
