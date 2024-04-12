import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IAlbum, IArtist } from '@/interfaces/data.interface'
import { getArtists } from '@/utilities/fetchers'

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
    console.log('fetching')

    const artistsRaw = await getArtists()
    artists.value = artistsRaw.map((artist: any) => ({
      ...artist,
      tags: new Set<string>(JSON.parse(artist.tags)),
      recentAlbums: new Set<IAlbum>(JSON.parse(artist.recentAlbums))
    }))

    console.log('fetched')
  }

  return { artists, bandcampArtists, spotifyArtists, tags, fetchArtists }
})
