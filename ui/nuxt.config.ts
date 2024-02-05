// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    firebase: {
      gen: 2
    },
    // preset: 'vercel-edge'
  },
  build: {
    transpile: ['tslib']
  },
  runtimeConfig: {
    openai_api_key: process.env.OPENAI_API_KEY,
    azure_ocr_endpoint: process.env.AZURE_DOC_AI_ENDPOINT,
    azure_ocr_key: process.env.AZURE_DOC_AI_KEY,
    // firebase_api_key: process.env.FIREBASE_API_KEY,
  },
  modules: [
    'nuxt-vuefire',
    '@nuxtjs/tailwindcss',
    '@invictus.codes/nuxt-vuetify',
    "@nuxt/image"
  ],
  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: "med-doc-parser.firebaseapp.com", //"med-doc-parser.ichaoran.com", 
      projectId: "med-doc-parser",
      storageBucket: "med-doc-parser.appspot.com",
      messagingSenderId: "134706535223",
      appId: "1:134706535223:web:f46bbfc4d31bae0d4e98b2",
      measurementId: "G-BXTZP711N2"
    },
    auth: {
      enabled: true
    },
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true, // | false,
      useIconCDN: true, //| false,

      /* vite-plugin-vuetify options */
      styles: true, //| 'none' | 'expose' | 'sass' | { configFile: string },
      autoImport: true, //| false,
      useVuetifyLabs: true, // | false, 
    }
  },
})