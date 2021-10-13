<template>
  <div class="main-section" v-if="status !== 'loading'">
    <div class="artist-section">
      <a class="artist-section__link" :href="artistData.info.uri" title="open artist page in spotify" aria-label="open artist page in spotify">
        <h1>{{ artistData.info.name }}</h1>
        <img :src="artistData.info.images[0].url"/>
      </a>
    </div>
    
    <h2>Releases</h2>
    <div class="albums-section">
      <div class="albums-section__album" v-for="album in artistData.albums" :key="album.id">
        <a class="albums-section__link" :href="album.uri" title="open album page in spotify" aria-label="open album page in spotify">
          <h3>{{ album.name }}</h3>
          <img :src="album.images[0].url"/>
        </a>
      </div>
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

export default {
  name: 'MainSection',
  data: () => ({
    artistData: null,
    status: 'loading'
  }),
  props: {},
  created: function () {
    this.getData();
  },
  methods: {
    getData: async function () {
      const token = await getToken();
      const artistDataArray = await fetchArtistsData(token, artistArray);
      const sortedAndFilteredArtists = sortAndFilterArtistsByPopularity(artistDataArray);
      const chosenArtist = getRandomArtistFromArray(sortedAndFilteredArtists);
      const chosenArtistAlbums = await fetchAlbumsFromArtist(token, chosenArtist.id);

      this.artistData = { info: chosenArtist, albums: chosenArtistAlbums };
      console.log(this.artistData);
      this.status = 'ready';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$breakpoint-tablet: 768px;

h1,
h2,
h3 {
  text-align: center;
  color: rgba(201, 201, 201, 0.576);
}

.artist-section {
  padding: 0 40%;
  margin-bottom: 4rem;

  @media (max-width: $breakpoint-tablet) {
    padding: 0;
    margin: 1rem;
  }
  
  &__link {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: opacity 500ms ease-in-out;

    &:hover {
      opacity: 0.5;
    }
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

  &__link {
    height: 100%;
    text-decoration: none; 
    transition: opacity 500ms ease-in-out;

    &:hover {
      opacity: 0.5;
    }
  }
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
</style>
