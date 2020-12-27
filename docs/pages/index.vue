<template>
  <main role="main">
    <div class="container relative mx-auto px-2 py-6 md:px-12 max-w-4xl md:py-12">
      <div class="flex flex-col items-center justify-center mb-16">
        <h1 class="mt-4 text-4xl font-bold font-display">
          <span class="favoritos-debug" id="favoritos-debug"></span>
        </h1>

        <p class="mt-4 text-xl text-purple-600 text-center">{{ page.description }}</p>

        <div class="mt-16 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
          <div v-for="feature in page.features" :key="feature.title">
            <h4 class="md:text-xl font-bold font-display">{{ feature.title }}</h4>
            <p class="mt-2">{{ feature.details }}</p>
          </div>
        </div>

        <demo></demo>
      </div>

      <content-wrapper :document="page"></content-wrapper>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import ContentWrapper from '@/components/ContentWrapper.vue';
import Demo from '~/components/Demo.vue';

export default Vue.extend({
  name: 'IndexPage',

  components: {
    Demo,
    ContentWrapper,
  },

  async asyncData({ $content }) {
    const page = await $content('home').fetch();

    return {
      page,
    };
  },

  head() {
    return {
      title: 'favoritos :: documentation',
    };
  },
});
</script>

<style>
.favoritos-debug {
  display: block;
  min-height: 32px;
}
</style>
