import {defineNuxtConfig} from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    nitro: {
        preset: 'browser',
    },
    buildModules: ['@pinia/nuxt'],
    css: [
        "@vuepic/vue-datepicker/dist/main.css",
        //"~/assets/sass/vuetify.sass",
        "@mdi/font/css/materialdesignicons.css",
        "~/assets/css/tailwind.css",
    ],
    build: {
        transpile: ["vuetify"],
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            lineChannelId: process.env.LINE_CHANNEL_ID,
            lineChannelSecret: process.env.LINE_CHANNEL_SECRET,
            lineRedirectUri: process.env.LINE_REDIRECT_URI,

        },
        lineChannelId: process.env.LINE_CHANNEL_ID,
        lineChannelSecret: process.env.LINE_CHANNEL_SECRET,
        lineRedirectUri: process.env.LINE_REDIRECT_URI,
    },
})
