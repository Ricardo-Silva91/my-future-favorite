<template>
  <div class="main-section" v-if="status === 'before'">
    <div class="landing-section">
      <get-artist-button @click="chooseArtist()"></get-artist-button>
      <!-- <button @click="chooseArtist()">Get Artist</button> -->
      <label>Filter by genre</label>
      <select class="select" @change="handleGenreChange($event)">
        <option v-for="genre, index in genres" :key="genre" :value="index">
          {{ genre === '' ? 'all' : genre }}
        </option>
      </select>
    </div>
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
import { getGenresFromArtistArray, getRandomArtistFromArray, sortAndFilterArtistsByPopularity } from '../utilities/utils';
import artistArray from '../assets/artists';
import Card from './Card.vue';
import GetArtistButton from './GetArtistButton.vue';

export default {
  components: { Card, GetArtistButton },
  name: 'MainSection',
  data: () => ({
    artistData: null,
    status: 'before',
    releasesVisible: false,
    token: null,
    sortedAndFilteredArtists: [],
    genres: [],
    selectedGenre: 0,
  }),
  props: {},
  created: function () {
    this.getArtists();
  },
  methods: {
    handleGenreChange: function(event) {
      const newVal = event.target.value;
      this.selectedGenre = newVal;
    },
    getArtists: async function () {
      this.token = await getToken();
      if (this.token.split){
        const artistDataArray = await fetchArtistsData(this.token, artistArray);
        this.sortedAndFilteredArtists = sortAndFilterArtistsByPopularity(artistDataArray);
        this.genres = getGenresFromArtistArray(this.sortedAndFilteredArtists);
      }
    },
    chooseArtist: async function () {
      this.status = 'loading';

      const chosenArtist = getRandomArtistFromArray(this.sortedAndFilteredArtists, this.genres[this.selectedGenre]);
      const chosenArtistAlbums = await fetchAlbumsFromArtist(this.token, chosenArtist.id);

      this.artistData = { info: chosenArtist, albums: chosenArtistAlbums };
      this.status = 'ready';

      setTimeout(() => {
        this.releasesVisible = true;
      }, 300);
    }
  }
}
</script>

<style scoped lang="scss">
$breakpoint-tablet: 768px;

.main-section {
  height: 100%;
}

.landing-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10% 0;
  flex-wrap: wrap;

  label {
    color: rgba(201, 201, 201, 0.576);
    margin-top: 5rem;
  }

  .select {
    color: rgba(201, 201, 201, 0.576);
    background-color: #0e0f10;
    border-radius: 8px;
    font-size: larger;
    margin-top: 1rem;
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
    flex: 1 0 21%; /* explanation below */
    margin: 1rem;

    @media (max-width: $breakpoint-tablet) {
      max-width: 100%;
    }
  }
}
</style>
