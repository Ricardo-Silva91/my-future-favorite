<template>
  <div
    :class="{
      submit: true,
      'submit--hidden': hidden
    }"
  >
    <h1>Submit new Artist/Band (⚠️ Work in progess ⚠️)</h1>
    <section>
      <FormKit type="form" @submit="submitArtist" #default="{ value }">
        <FormKit
          type="select"
          label="spotify or Bandcamp?"
          validation="required|not:Admin"
          name="app"
          :options="['spotify', 'bandcamp']"
          @input="setSelectedApp($event)"
        />
        <FormKit
          type="text"
          name="url"
          id="url"
          validation="(500)checkSpotifyUrl"
          validation-visibility="live"
          :validation-rules="{ checkSpotifyUrl }"
          :validation-messages="{
            checkSpotifyUrl:
              'Sorry, that url is not usable. Try something similar to https://open.spotify.com/artist/[artist-id] or https://[my-band].bandcamp.com/.'
          }"
          label="Artist/Band url"
          help="Enter the url for the artist/band page on spotify or bandcamp"
          placeholder="https://open.spotify.com/artist/[artist-id] or https://[my-band].bandcamp.com/"
        />
      </FormKit>
    </section>
  </div>
</template>

<script setup lang="ts">
import { submitBandcampBand, submitSpotifyArtist } from '@/utilities/fetchers'
import type { FormKitNode } from 'node_modules/@formkit/core/dist/index.mjs'
// import { FormKitNode } from 'node_modules\@formkit\core\dist\index.d.mts'
import { ref, onMounted } from 'vue'

const selectedApp = ref<'spotify' | 'bandcamp'>('spotify')

const setSelectedApp = (newSelectedApp?: string) => {
  selectedApp.value = newSelectedApp as 'spotify' | 'bandcamp'
}

const checkSpotifyUrl: (node: FormKitNode, ...args: any[]) => boolean | Promise<boolean> = (
  node: FormKitNode,
  ...args: any[]
) => {
  const value = node.value as string
  const resolvedUrl = getLinkFromSubmittedValue(value)

  return !!resolvedUrl
}

const getLinkFromSubmittedValue = (url: string) => {
  if (selectedApp.value === 'spotify') {
    const match1 = url.match(/^spotify:artist:[0-9a-zA-Z]+$/g)

    if (match1) {
      return url
    }

    const match2 = url.match(
      /^https:\/\/open.spotify.com\/artist\/[0-9a-zA-Z]+(\?[0-9a-zA-Z=_-]+)*$/g
    )

    if (match2) {
      const hasQuery = url.indexOf('?')
      return hasQuery !== -1
        ? url.replace('https://open.spotify.com/artist/', 'spotify:artist:').slice(0, hasQuery)
        : url.replace('https://open.spotify.com/artist/', 'spotify:artist:')
    }
  } else {
    const match1 = url.match(/^https:\/\/[a-zA-Z0-9-_]+.bandcamp.com(\/)*([\/a-zA-Z0-9-_]*)$/g)

    if (match1) {
      return url
    }
  }

  return undefined
}

const submitArtist = async (fields: any) => {
  const app = fields['app']
  const url = fields['url']
  const resolvedUrl = getLinkFromSubmittedValue(url)

  if (!resolvedUrl) {
    return
  }

  if (selectedApp.value === 'bandcamp') {
    submitBandcampBand(resolvedUrl)
  } else {
    submitSpotifyArtist(resolvedUrl)
  }
}

const hidden = ref(true)

onMounted(() => {
  setTimeout(() => {
    hidden.value = false
  }, 100)
})
</script>

<style lang="scss">
.submit {
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
</style>
