import { getArtists } from '../../src/utilities/google.utils'

export default async (req) => {
  const spotifyLink = new URL(req.url).searchParams.get('spotifyLink')

  ;(async () => {
    const artists: any[] = await getArtists()
    const foundArtist = artists.find((artist) => artist.uri === spotifyLink)

    if (foundArtist) {
      console.log('artist already in list, doing nothing')
    } else {
      console.log('artist is new, adding to list')
    }
  })()

  return new Response('thank you for submitting', { status: 200 })
}
