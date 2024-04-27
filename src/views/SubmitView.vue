<template>
  <div
    :class="{
      submit: true,
      'submit--hidden': hidden
    }"
  >
    <h1>Submit new Artist/Band</h1>
    <section>
      <FormKit type="form" @submit="submitArtist" #default="{ value }" v-if="state === 'submit'">
        <Select
          id="select-app"
          :options="appFilterOptions"
          :label="selectedApp"
          @valueChange="setSelectedApp($event)"
        ></Select>
        <FormKit
          type="text"
          name="url"
          id="url"
          v-model="formUrl"
          validation="(500)checkSpotifyUrl"
          validation-visibility="live"
          :validation-rules="{ checkSpotifyUrl }"
          :validation-messages="{
            checkSpotifyUrl:
              'Sorry, that url is not usable. Try something similar to https://open.spotify.com/artist/[artist-id] or https://[my-band].bandcamp.com/.'
          }"
          label="Artist/Band url"
          help="something like https://open.spotify.com/artist/[artist-id] or https://[my-band].bandcamp.com/"
          placeholder="https://..."
        />
        <div v-if="errorMsg" class="submit__error-msg">{{ errorMsg }}</div>
      </FormKit>

      <div v-if="state === 'response'">
        <div v-if="responseStatus === 200">
          <div>Thank you for submitting 😊</div>

          <button @click="state = 'submit'" class="submit__return-button">Submit another</button>
        </div>
        <div v-if="responseStatus === 400">
          <div>Submited url is already in list 😌</div>

          <button @click="state = 'submit'" class="submit__return-button">Submit another</button>
        </div>
        <div v-if="responseStatus === 500">
          <div>Something went wrong 😖</div>

          <button @click="state = 'submit'" class="submit__return-button">Try again</button>
        </div>
      </div>

      <div v-if="state === 'loading'" class="submit__loader-box">
        <Loader class="submit__loader"></Loader>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { TApp } from '@/interfaces/data.interface'
import Select from '@/components/Select.vue'
import Loader from '@/components/Loader.vue'
import { submitBandcampBand, submitSpotifyArtist } from '@/utilities/fetchers'
import type { FormKitNode } from 'node_modules/@formkit/core/dist/index.mjs'
import { ref, onMounted } from 'vue'

const state = ref<'submit' | 'response' | 'loading'>('submit')
const responseStatus = ref<number>(200)
const formUrl = ref<string | undefined>(undefined)
const errorMsg = ref<string | undefined>(undefined)
const selectedApp = ref<TApp>('spotify')
const appFilterOptions = ref([
  { value: 'spotify', label: 'Spotify' },
  { value: 'bandcamp', label: 'Bandcamp' }
])

const setSelectedApp = (newSelectedApp?: string) => {
  selectedApp.value = newSelectedApp as TApp
  const savedVal = formUrl.value
  formUrl.value = undefined

  setTimeout(() => {
    formUrl.value = savedVal
  })
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
        ? url.slice(0, hasQuery).replace('https://open.spotify.com/artist/', 'spotify:artist:')
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
  state.value = 'loading'
  const url = fields['url']
  const resolvedUrl = getLinkFromSubmittedValue(url)

  if (!resolvedUrl) {
    state.value = 'submit'
    return
  }

  if (selectedApp.value === 'bandcamp') {
    responseStatus.value = await submitBandcampBand(resolvedUrl)
  } else {
    responseStatus.value = await submitSpotifyArtist(resolvedUrl)
  }

  state.value = 'response'
  formUrl.value = undefined
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

  &__error-msg {
    color: $color-white;
    margin-top: 1rem;
  }

  &__loader-box {
    position: relative;
    padding: 3rem 0;
  }

  & h1,
  h2,
  p {
    text-align: left;
  }

  .formkit-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    margin-top: 4rem;
  }

  .formkit-label {
    color: $color-white;
  }

  .formkit-inner {
    position: relative;
    height: fit-content;
    background-color: #0e0f10;

    & > input {
      width: 100%;
      padding: 0.5rem 1rem;
      background-color: #0e0f10;
      color: $color-white;
      border: 10px solid;
      border-image-slice: 1;
      border-width: 1px;
      border-image-source: linear-gradient(
        to left,
        $color-primary-purple,
        $color-primary-purple-light
      );
      transition: all 500ms ease-in-out;

      &:hover {
        border-image-source: linear-gradient(
          to left,
          $color-primary-purple-light,
          $color-primary-purple
        );
      }

      &:focus {
        outline: none;
      }
    }
  }

  .formkit-messages {
    position: absolute;
  }

  .formkit-label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .formkit-help {
    color: $color-white;
    margin-top: 0.2rem;
  }

  .formkit-input[type='submit'],
  &__return-button {
    padding: 0.5rem 1rem;
    background-color: #0e0f10;
    color: $color-white;
    margin-top: 2rem;
    cursor: pointer;
    border: 10px solid;
    border-image-slice: 1;
    border-width: 1px;
    border-image-source: linear-gradient(
      to left,
      $color-primary-purple,
      $color-primary-purple-light
    );
    transition: all 500ms ease-in-out;

    &:hover {
      border-image-source: linear-gradient(
        to left,
        $color-primary-purple-light,
        $color-primary-purple
      );
    }
  }
}
</style>
