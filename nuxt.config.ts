// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    preset: 'firebase',
    firebase: {
      gen: 2,
      httpsOptions: {
        region: 'asia-southeast1',
        maxInstances: 3,
      },
    },
    replace: {
      "functions.https.onRequest": "functions.region('asia-southeast1').https.onRequest",
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
      authDomain: "med-doc-parser.ichaoran.com",  //"med-doc-parser.firebaseapp.com", //
      databaseURL: "https://med-doc-parser-default-rtdb.asia-southeast1.firebasedatabase.app",
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