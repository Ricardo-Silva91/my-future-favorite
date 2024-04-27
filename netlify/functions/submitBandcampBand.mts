import { addArtist, getArtists } from '../../src/utilities/google.utils'

export default async (req) => {
  const bandLink = new URL(req.url).searchParams.get('bandLink')

  if (!bandLink) {
    return new Response('bandcamp link not provided', { status: 400 })
  }

  const bandDomainRex = new RegExp('https://[0-9a-zA-Z-_]+.bandcamp.com', 'g')
  const match = bandLink.match(bandDomainRex)

  if (!match || !match.length) {
    return new Response('Internal server error', { status: 500 })
  }

  try {
    const artists: any[] = await getArtists()
    const foundArtist = artists.find((artist) => artist.url === match[0])

    if (foundArtist) {
      console.log('band already in list, doing nothing')
      return new Response('band already in list', { status: 400 })
    }

    console.log('band is new, adding to list')
    await addArtist(match[0], 'bandcamp')

    return new Response('thank you for submitting', { status: 200 })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}
