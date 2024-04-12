import { getArtists } from '../../src/utilities/google.utils'

export default async () => {
  const artists: any[] = await getArtists()

  return new Response(JSON.stringify({ artists }), { status: 200 })
}
