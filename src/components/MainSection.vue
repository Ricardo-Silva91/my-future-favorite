<template>
  <div class="main-section" v-if="status === 'before'">
    <button @click="getArtist()">Get Artist</button>
  </div>
  <div class="main-section" v-if="status === 'loading'">
    loading
  </div>
  <div class="main-section" v-if="status === 'ready'">
    <div class="artist-section">
      <card
        :item="artistData.info"
        :revealTimeout="100"
        title="open artist page in spotify">
      </card>
    </div>
    
    <h2
      :class="{
        'releases': true,
        'releases--visible': releasesVisible
      }">
      Releases
    </h2>
    <div class="albums-section">
      <card
        class="albums-section__album"
        v-for="album, index in artistData.albums"
        :key="album.id"
        :item="album"
        :revealTimeout="500 * (index + 1)"
        title="open album page in spotify">
      </card>
    </div>
  </div>
</template>

<script>
import { 
  fetchAlbumsFromArtist,
  fetchArtistsData,
  getToken,
} from '../utilities/fetchers';
import { getRandomArtistFromArray, sortAndFilterArtistsByPopularity } from '../utilities/utils';
import artistArray from '../assets/artists.json';
import Card from './Card.vue';

export default {
  components: { Card },
  name: 'MainSection',
  data: () => ({
    artistData: null,
    status: 'before',
    releasesVisible: false,
  }),
  props: {},
  created: function () {
  },
  methods: {
    getData: async function () {
      const token = await getToken();
      const artistDataArray = await fetchArtistsData(token, artistArray);
      const sortedAndFilteredArtists = sortAndFilterArtistsByPopularity(artistDataArray);
      const chosenArtist = getRandomArtistFromArray(sortedAndFilteredArtists);
      const chosenArtistAlbums = await fetchAlbumsFromArtist(token, chosenArtist.id);

      this.artistData = { info: chosenArtist, albums: chosenArtistAlbums };
      this.status = 'ready';

      setTimeout(() => {
        this.releasesVisible = true;
      }, 300);
    },
    getArtist: function () {
      this.status = 'loading';
      this.getData();
    }
  }
}
</script>

<style scoped lang="scss">
$breakpoint-tablet: 768px;

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
    flex: 1 0 21%; /* explanation below */
    margin: 1rem;

    @media (max-width: $breakpoint-tablet) {
      max-width: 100%;
    }
  }
}
</style>
