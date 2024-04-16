import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IAlbum, IArtist } from '@/interfaces/data.interface'
import {
  getArtists,
  getArtistsFromLocalStorage,
  getBlockedArtistsFromLocalStorage,
  saveArtistsInLocalStorage,
  saveBlockedArtistsInLocalStorage
} from '@/utilities/fetchers'
import { getTodayStamp } from '@/utilities/utils'

export const useArtistsStore = defineStore('artists', () => {
  const artists = ref<IArtist[]>([])
  const bandcampArtists = computed(() =>
    availableArtists.value.filter((artist) => artist.app === 'bandcamp')
  )
  const spotifyArtists = computed(() =>
    availableArtists.value.filter((artist) => artist.app === 'spotify')
  )
  const availableArtists = computed(() => {
    const blockedArtists = getBlockedArtistsFromLocalStorage()

    return artists.value.filter((artist) => !blockedArtists.includes(artist.url))
  })
  const tags = computed(() =>
    availableArtists.value.reduce(
      (acc: string[], artist: IArtist) => [...acc, ...Array.from(artist.tags)],
      []
    )
  )
  async function fetchArtists() {
    const localArtists = getArtistsFromLocalStorage()
    const todayStamp = getTodayStamp()

    if (localArtists && localArtists.date === todayStamp) {
      artists.value = localArtists.artistArray
    } else {
      const artistsRaw = await getArtists()
      const resolvedArtists = artistsRaw.map((artist: any) => ({
        ...artist,
        tags: Array.from(new Set(JSON.parse(artist.tags))),
        recentAlbums: JSON.parse(artist.recentAlbums),
        recentSales: parseInt(artist.recentSales, 10),
        popularityScore: parseInt(artist.popularityScore, 10)
      }))
      artists.value = resolvedArtists

      saveArtistsInLocalStorage(resolvedArtists)
    }
  }

  function blockArtist(url: string) {
    const blockedArtists = getBlockedArtistsFromLocalStorage()
    const newArray = [...new Set([...blockedArtists, url])]

    saveBlockedArtistsInLocalStorage(newArray)

    alert(`artist ${url} was blocked and will not be recomended anymore`)

    fetchArtists()
  }

  return {
    artists,
    availableArtists,
    bandcampArtists,
    spotifyArtists,
    tags,
    fetchArtists,
    blockArtist
  }
})
