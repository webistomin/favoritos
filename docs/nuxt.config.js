export default {
  target: 'static',

  head: {
    title: 'nanogram.js-docs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],

  modules: ['@nuxtjs/pwa', '@nuxt/content'],

  content: {},

  build: {
    postcss: {
      plugins: {
        'postcss-nested': {},
        autoprefixer: {},
      },
    },
  },
};
