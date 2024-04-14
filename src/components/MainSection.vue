<template>
  <div class="main-section">
    <div class="landing-section" v-if="status === 'before'">
      <get-artist-button @click="chooseArtist()"></get-artist-button>
      <button class="landing-section__catalog-button" @click="handleCatalogClick()">
        See Full Catalog
      </button>
      <div class="landing-section__sort-and-filter">
        <div class="landing-section__field">
          <Select
            id="filter-app"
            :options="appFilterOptions"
            label="Filter By App"
            @valueChange="handleAppFilterChange($event)"
          ></Select>
        </div>
        <div class="landing-section__field">
          <Select
            id="tags"
            :options="tags.map((tag) => ({ label: tag === '' ? 'all' : tag, value: tag }))"
            label="Filter by tag"
            @valueChange="handleTagFilterChange($event)"
          ></Select>
        </div>
      </div>
    </div>

    <div class="loading-section" v-if="status === 'loading'">
      <Loader></Loader>
    </div>

    <div class="ready-section" v-if="status === 'ready' && artistData">
      <div class="artist-section">
        <card :item="artistData" :revealTimeout="100" title="open artist page in spotify"> </card>
      </div>

      <h2
        :class="{
          releases: true,
          'releases--visible': releasesVisible
        }"
      >
        Releases
      </h2>
      <div class="albums-section">
        <card
          class="albums-section__album"
          v-for="(album, index) in artistData.albums.slice(0, 4)"
          :key="index"
          :item="album"
          :revealTimeout="500 * (index + 1)"
          title="open album page in spotify"
        >
        </card>
      </div>
    </div>

    <div class="catalog-section" v-if="status === 'catalog'">
      <card
        class="catalog-section__card"
        v-for="(artist, index) in catalogItems"
        :key="artist.url"
        :item="artist"
        :revealTimeout="500 * (index + 1)"
        title="open artist page in spotify"
      >
      </card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ICardItem, type IArtist } from '@/interfaces/data.interface'
import { useArtistsStore } from '@/stores/artists'
import { computed, onMounted, ref, watch } from 'vue'
import Card from './Card.vue'
import GetArtistButton from './GetArtistButton.vue'
import Select from './Select.vue'
import Loader from './Loader.vue'

const artistStore = useArtistsStore()

onMounted(() => {
  ;(async () => {
    await artistStore.fetchArtists()

    status.value = 'before'
  })()
})

const tags = computed(() => artistStore.tags)
const artists = computed<IArtist[]>(() => artistStore.artists)

const status = ref<'before' | 'loading' | 'ready' | 'catalog'>('loading')
const sortedAndFilteredArtists = computed<IArtist[]>(() => {
  const appFilteredArtists = appFilter.value
    ? artists.value.filter((artist) => artist.app === appFilter.value)
    : artists.value
  const tagFilteredArtists = tagFilter.value
    ? appFilteredArtists.filter((artist) => artist.tags.includes(tagFilter.value || ''))
    : appFilteredArtists

  return tagFilteredArtists
})
const appFilterOptions = ref([
  { value: 'bandcamp', label: 'Bandcamp' },
  { value: 'spotify', label: 'Spotify' }
])
const artistData = ref<ICardItem>()
const releasesVisible = ref(false)

const appFilter = ref<'spotify' | 'bandcamp' | undefined>(undefined)
const tagFilter = ref<string | undefined>(undefined)

const catalogItems = computed<ICardItem[]>(() =>
  sortedAndFilteredArtists.value.map((artist) => ({
    image: artist.profilePicUrl,
    name: artist.name,
    title: artist.name,
    url: artist.uri || artist.external_url || artist.url,
    albums: Array.from(artist.recentAlbums).map((album) => ({
      albums: [],
      image: album.coverUrl,
      name: album.name,
      title: album.name,
      url: album.external_url || album.url
    }))
  }))
)

const chooseArtist = () => {
  const chosenArtist =
    sortedAndFilteredArtists.value[
      Math.floor(Math.random() * sortedAndFilteredArtists.value.length)
    ]

  console.log({ chosenArtist, sortedAndFilteredArtists: sortedAndFilteredArtists.value })

  artistData.value = {
    image: chosenArtist.profilePicUrl,
    name: chosenArtist.name,
    title: chosenArtist.name,
    url: chosenArtist.uri || chosenArtist.external_url || chosenArtist.url,
    albums: Array.from(chosenArtist.recentAlbums).map((album) => ({
      albums: [],
      image: album.coverUrl,
      name: album.name,
      title: album.name,
      url: album.external_url || album.url
    }))
  }

  status.value = 'ready'
}
const handleCatalogClick = () => {
  status.value = 'catalog'
}
const handleAppFilterChange = (event: 'spotify' | 'bandcamp') => {
  appFilter.value = event
}
const handleTagFilterChange = (event: string) => {
  console.log({ event })

  tagFilter.value = event

  console.log({ tagFilter })
}
</script>

<style scoped lang="scss">
$breakpoint-tablet: 768px;
$breakpoint-mobile: 576px;

.main-section {
  height: 100%;
}

.landing-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10% 0 0;
  flex-wrap: wrap;

  &__sort-and-filter {
    width: 60%;
    margin-top: 3rem;
    justify-content: space-around;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: $breakpoint-tablet) {
      flex-direction: column;
      align-items: center;
    }

    label {
      color: rgba(201, 201, 201, 0.576);
    }

    select {
      width: 14rem;
      color: rgba(201, 201, 201, 0.576);
      background-color: #0e0f10;
      border-radius: 8px;
      font-size: larger;
    }
  }

  &__field {
    width: 25%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;

    @media (max-width: $breakpoint-tablet) {
      width: 100%;
    }
  }
}

.artist-section {
  padding: 0 40%;
  margin-bottom: 4rem;

  @media (max-width: $breakpoint-tablet) {
    padding: 0;
    margin: 1rem;
  }
}

.releases {
  opacity: 0;
  transition: opacity 1000ms ease-in-out;

  &--visible {
    opacity: 1;
  }
}

.albums-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: $breakpoint-tablet) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  &__album {
    height: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: calc(20% - 1rem);
    flex: 1 0 21%;
    margin: 1rem;

    @media (max-width: $breakpoint-tablet) {
      max-width: 100%;
    }
  }
}

.landing-section__catalog-button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: $color-black;
  color: $color-text-grey;
  margin-top: 9rem;

  border: 1px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, $color-primary-purple, $color-primary-purple-light);
  transition: all 500ms ease-in-out;

  &:hover {
    border-image-source: linear-gradient(
      to left,
      $color-primary-purple-light,
      $color-primary-purple
    );
  }
}

.catalog-section {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 3rem;
  column-gap: 3rem;
  padding: 0 2rem;

  @media (max-width: $breakpoint-tablet) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;
  }
}
</style>
