import { getSpotifyToken } from '../../src/utilities/spotify.utils'

export default async () => {
  const token = await getSpotifyToken()
  const body = JSON.stringify({ token })

  return new Response(body, { status: 200 })
}
