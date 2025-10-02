export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'vuetify-nuxt-module'],
  nitro: {
    devProxy: {
      '/backend': {
        target: import.meta.env.NUXT_API_BASE_URL,
        changeOrigin: true,
      }
    }
  }
})