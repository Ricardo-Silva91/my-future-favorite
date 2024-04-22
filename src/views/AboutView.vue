<template>
  <div
    :class="{
      about: true,
      'about--hidden': hidden
    }"
  >
    <h1>My Future Favorite</h1>
    <section>
      <p>
        This is a web app for discovering new underground artists/bands on Spotify and Bandcamp.
      </p>
      <p>
        Uses the Spotify web API to sort artists/bands by popularity and recent sales number to sort
        bandcamp artists/bands.
      </p>
      <p>
        If you want to submit a new profile, you can do it
        <RouterLink to="/submit">here</RouterLink>.
      </p>
    </section>
    <section>
      <h2>How it works</h2>
      <p>
        <a
          href="https://github.com/Ricardo-Silva91/my-future-favorite/actions/workflows/maintain.yml"
          target="_blank"
          >Everyday</a
        >, the artits/band data is fetched from the Spotify API and Bandcamp (<a
          href="https://github.com/Ricardo-Silva91/my-future-favorite/blob/main/src/interfaces/data.interface.ts#L18"
          target="_blank"
          >here</a
        >'s some more information about the artist data).
      </p>
      <p>In the app, you can then click the big play button get suggested a new artist.</p>
      <p>
        This artist will be chosen according to either their popularity score (set by Spotify) or
        the number of recent sales (according to Bandcamp).
      </p>
      <p>
        You will only get artists/bands the have the lowest score, to promote the discovery of
        underground artists 😉.
      </p>
      <p>
        If multiple artists have the same lowest score, you will get a random one out of the bunch.
      </p>
      <p>
        After getting the chosen artist, you can either click the artists profile picture or any of
        the 'Releases' cards and it will take you to their page 😁.
      </p>
      <p>You can also block artists you don't like so they won't get recommended to you again.</p>
    </section>
    <section>
      <h2>Contributing</h2>
      <p>
        This project is open-source, so you can check all the code involved
        <a href="https://github.com/Ricardo-Silva91/my-future-favorite" target="_blank">here</a>.
      </p>
      <p>Pull requests with fixes and improvements are always welcome.</p>
      <p>
        Also, if you have some ideas for improvement that you want to discuss, please use the
        <a href="https://github.com/Ricardo-Silva91/my-future-favorite/issues" target="_blank"
          >issues</a
        >
        section 😊.
      </p>
    </section>
    <section>
      <h2>Final Note</h2>
      <p>
        This is just an idea, and wether it works or not depends on how many people support it (both
        artists and fans), So if you're an artist, don't just submit your profile to get more
        streams, actually engage with the app and support other underground artists.
      </p>
      <p>
        And if you're a fan, don't give up on this project just because you didn't find your actual
        'Future Favorite' on the first try 😅, try it again and you'll get something you really
        like, that you wouldn't find otherwise 😁.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const hidden = ref(true)

onMounted(() => {
  setTimeout(() => {
    hidden.value = false
  }, 100)
})
</script>

<style lang="scss">
.about {
  padding: 2rem;
  color: $color-white;
  opacity: 1;
  transform: translateY(0);

  transition:
    opacity 2s ease-in-out,
    transform 2s cubic-bezier(0, -0.52, 0, 2.14);

  &--hidden {
    opacity: 0;
    transform: translateY(20px);
  }

  & h1,
  h2,
  p {
    text-align: left;
  }
}
// @media (min-width: 1024px) {
//   .about {
//     display: flex;
//     align-items: center;
//   }
// }
</style>
