import { createApp, defineComponent, h } from 'vue';
import App from './App.vue';

class MLLifecycleComponent extends HTMLElement {
  private app: any = null;
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Create a container for the Vue app
    const appContainer = document.createElement('div');
    this.shadow.appendChild(appContainer);

    // Create and mount the Vue application
    const AppWrapper = defineComponent({
      render() {
        return h(App);
      }
    });

    this.app = createApp(AppWrapper);
    this.app.mount(appContainer);

    // Add global styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
    this.shadow.appendChild(styleSheet);
  }

  disconnectedCallback() {
    // Clean up when the component is removed
    if (this.app) {
      this.app.unmount();
      this.app = null;
    }
  }
}

// Register the custom element
customElements.define('ml-lifecycle-visualization', MLLifecycleComponent);

export default MLLifecycleComponent; 