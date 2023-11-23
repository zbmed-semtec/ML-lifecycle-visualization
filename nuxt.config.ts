// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  vite: {
    plugins: [
      svgLoader({
       // Your settings.
      }),
    ],
  },
})
