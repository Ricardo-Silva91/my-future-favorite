import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IAlbum, IArtist } from '@/interfaces/data.interface'
import {
  getArtists,
  getArtistsFromLocalStorage,
  saveArtistsInLocalStorage
} from '@/utilities/fetchers'
import { getTodayStamp } from '@/utilities/utils'

export const useArtistsStore = defineStore('artists', () => {
  const artists = ref<IArtist[]>([])
  const bandcampArtists = computed(() =>
    artists.value.filter((artist) => artist.app === 'bandcamp')
  )
  const spotifyArtists = computed(() => artists.value.filter((artist) => artist.app === 'spotify'))
  const tags = computed(() =>
    artists.value.reduce(
      (acc: string[], artist: IArtist) => [...acc, ...Array.from(artist.tags)],
      []
    )
  )
  async function fetchArtists() {
    const localArtists = getArtistsFromLocalStorage()
    const todayStamp = getTodayStamp()

    if (localArtists && localArtists.date === todayStamp) {
      console.log({ localArtists })

      artists.value = localArtists.artistArray
    } else {
      const artistsRaw = await getArtists()
      const resolvedArtists = artistsRaw.map((artist: any) => ({
        ...artist,
        tags: Array.from(new Set(JSON.parse(artist.tags))),
        recentAlbums: JSON.parse(artist.recentAlbums)
      }))
      artists.value = resolvedArtists

      saveArtistsInLocalStorage(resolvedArtists)
    }
  }

  return { artists, bandcampArtists, spotifyArtists, tags, fetchArtists }
})
