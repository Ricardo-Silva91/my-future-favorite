export const getToken = async () => {
  const res = await fetch('.netlify/functions/getToken')

  const getTokenJson = await res.json()

  return getTokenJson.token
}

export const getArtists = async () => {
  const res = await fetch('.netlify/functions/getArtists')

  const getArtistsJson = await res.json()

  return getArtistsJson.artists
}

export const fetchArtistsData = async (token: string, artistArray: any[]) => {
  const spotifyArtists = artistArray.reduce((acc, artist) => {
    if (artist.app !== 'spotify') {
      return acc
    }

    return `${acc}${acc !== '' ? ',' : ''}${artist.id}`
  }, '')

  const res = await fetch(`https://api.spotify.com/v1/artists?ids=${spotifyArtists}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const fetchArtistsDataJson = await res.json()

  return fetchArtistsDataJson.artists.filter((artist: any) => artist.images.length)
}

export const fetchAlbumsFromArtist = async (token: string, artistId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=5`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const fetchAlbumsFromArtistJson = await res.json()

  return fetchAlbumsFromArtistJson.items
}

export const submitBandcampBand = async (bandLink: string) => {
  const res = await fetch(`.netlify/functions/submitBandcampBand?bandLink=${bandLink}`)

  // const result = await res.json()
}
