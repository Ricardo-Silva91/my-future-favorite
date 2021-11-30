<template>
  <div class="main-section">

    <div class="landing-section" v-if="status === 'before'">
      <get-artist-button @click="chooseArtist()"></get-artist-button>
      <button class="landing-section__catalog-button" @click="handleCatalogClick()">See Full Catalog</button>
      <div class="landing-section__sort-and-filter">
        <div class="landing-section__field">
          <Select id="sort" :options="sortOptions" label="Sort By" @valueChange="handleSortChange($event)"></Select>
        </div>
        <div class="landing-section__field">
          <Select id="genre" :options="genres.map((genre, index) => ({ label: genre === '' ? 'all' : genre, value: index }))" label="Filter by genre" @valueChange="handleGenreChange($event)"></Select>
        </div>
      </div>
    </div>

    <div class="loading-section" v-if="status === 'loading'">
      loading
    </div>
    
    <div class="ready-section" v-if="status === 'ready'">
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
        }"
      >
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
    
    <div class="catalog-section" v-if="status === 'catalog'">
      <card
        class="catalog-section__card"
        v-for="artist, index in sortedAndFilteredArtists"
        :key="artist.id"
        :item="artist"
        :revealTimeout="500 * (index + 1)"
        title="open artist page in spotify">
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
import { getGenresFromArtistArray, getRandomArtistFromArray, sortAndFilterArtists } from '../utilities/utils';
import artistArray from '../assets/artists';
import Card from './Card.vue';
import GetArtistButton from './GetArtistButton.vue';
import Select from './Select.vue';

export default {
  components: { Card, GetArtistButton, Select },
  name: 'MainSection',
  data: () => ({
    artistData: null,
    status: 'before',
    releasesVisible: false,
    token: null,
    artistDataArray: [],
    sortedAndFilteredArtists: [],
    genres: [],
    selectedGenre: 0,
    selectedSort: 'popularity',
    sortOptions: [
      { label: 'Popularity', value: 'popularity' },
      { label: 'Number of Followers', value: 'followers' },
    ]
  }),
  props: {},
  created: function () {
    this.getArtists();
  },
  methods: {
    handleGenreChange: function(newVal) {
      this.selectedGenre = newVal;
    },
    handleSortChange: function(newVal) {
      this.selectedSort = newVal;

      this.sortedAndFilteredArtists = sortAndFilterArtists(this.artistDataArray, this.selectedSort);
      this.genres = getGenresFromArtistArray(this.sortedAndFilteredArtists);
    },
    handleCatalogClick: function() {
      this.sortedAndFilteredArtists = this.artistDataArray.sort((a, b) => {
        const scoreA = this.selectedSort === 'popularity' ? a.popularity : a.followers.total;
        const scoreB = this.selectedSort === 'popularity' ? b.popularity : b.followers.total;

        return scoreA > scoreB ? 1 : -1;
    });
      this.status = 'catalog';
    },
    getArtists: async function () {
      this.token = await getToken();
      if (this.token.split) {
        this.artistDataArray = await fetchArtistsData(this.token, artistArray);
        this.sortedAndFilteredArtists = sortAndFilterArtists(this.artistDataArray, this.selectedSort);
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
