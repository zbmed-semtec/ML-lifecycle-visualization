/// <reference types="vite/client" />

declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module '*.svg' {
  import type { Component } from 'vue'
  const component: Component
  export default component
}
