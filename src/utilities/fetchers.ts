import type { IArtist } from '@/interfaces/data.interface'
import { getTodayStamp } from './utils'

export const getToken = async () => {
  const res = await fetch('.netlify/functions/getToken')

  const getTokenJson = await res.json()

  return getTokenJson.token
}

export const getArtists = async () => {
  const res = await fetch('.netlify/functions/getArtists')

  const getArtistsJson = await res.json()

  return getArtistsJson.artists.filter((artist: IArtist) => !!artist.recentAlbums)
}

export const saveArtistsInLocalStorage = async (artistArray: IArtist[]) => {
  const toSave = {
    date: getTodayStamp(),
    artistArray
  }

  window.localStorage.setItem('myFutureFavoriteArtistData', JSON.stringify(toSave))
}

export const getArtistsFromLocalStorage = (): { date: string; artistArray: IArtist[] } => {
  const data = window.localStorage.getItem('myFutureFavoriteArtistData')

  return data ? JSON.parse(data) : undefined
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

  console.log({ fetchArtistsDataJson, spotifyArtists })

  return fetchArtistsDataJson.artists.filter((artist: any) => artist.images.length)
}

export const getBlockedArtistsFromLocalStorage = (): string[] => {
  const data = window.localStorage.getItem('myFutureFavoriteBlockedArtists')

  return data ? JSON.parse(data) : []
}
export const saveBlockedArtistsInLocalStorage = async (blockedArtists: string[]) => {
  window.localStorage.setItem('myFutureFavoriteBlockedArtists', JSON.stringify(blockedArtists))
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

  return res.status
}

export const submitSpotifyArtist = async (spotifyLink: string) => {
  const res = await fetch(`.netlify/functions/submitSpotifyArtist?spotifyLink=${spotifyLink}`)

  return res.status
}
