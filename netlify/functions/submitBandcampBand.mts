import { addArtist, getArtists } from '../../src/utilities/google.utils'

export default async (req) => {
  const bandLink = new URL(req.url).searchParams.get('bandLink')

  if (!bandLink) {
    return new Response('bandcamp link not provided', { status: 400 })
  }

  // ;(async () => {
  const artists: any[] = await getArtists()
  const foundArtist = artists.find((artist) => artist.url === bandLink)

  if (foundArtist) {
    console.log('band already in list, doing nothing')
  } else {
    console.log('band is new, adding to list')
    await addArtist(bandLink, 'bandcamp')
  }
  // })()

  return new Response('thank you for submitting', { status: 200 })
}
