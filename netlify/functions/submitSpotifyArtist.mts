import { addArtist, getArtists } from '../../src/utilities/google.utils'

export default async (req) => {
  const spotifyLink = new URL(req.url).searchParams.get('spotifyLink')

  if (!spotifyLink) {
    return new Response('spotify link not provided', { status: 400 })
  }

  // ;(async () => {
  const artists: any[] = await getArtists()
  const foundArtist = artists.find((artist) => artist.uri === spotifyLink)

  if (foundArtist) {
    console.log('artist already in list, doing nothing')
  } else {
    console.log('artist is new, adding to list')
    await addArtist(spotifyLink, 'spotify')
  }
  // })()

  return new Response('thank you for submitting', { status: 200 })
}
