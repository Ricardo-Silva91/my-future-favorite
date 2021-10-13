<template>
  <div class="main-section" :v-if="artistData?.chosenArtist">
    <h1>{{ artistData?.chosenArtist?.name }}</h1>
    <img :src="artistData?.chosenArtist?.images[0].url"/>
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
    artistData: 'null',
    message: 'asuihdias',
  }),
  props: {},
  created: function () {
    console.log('mounting'); 
    this.getData();
  },
  methods: {
    getData: async function () {
      const token = await getToken();
      const artistDataArray = await fetchArtistsData(token, artistArray);
      const sortedAndFilteredArtists = sortAndFilterArtistsByPopularity(artistDataArray);
      const chosenArtist = getRandomArtistFromArray(sortedAndFilteredArtists);
      const chosenArtistAlbums = await fetchAlbumsFromArtist(token, chosenArtist.id);

      this.artistData = { chosenArtist, chosenArtistAlbums };
      // console.log(this.artistData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: white;
}
</style>
