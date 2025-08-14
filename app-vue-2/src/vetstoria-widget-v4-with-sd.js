import Vue from 'vue';
import VetstoriaWidget from './VetstoriaWidget.vue';

class MyCustomElement extends HTMLElement {
  static get observedAttributes() {
    return ['initial-posts-per-page', 'initial-widget-title'];
  }

  constructor() {
    super();
    this.vueInstance = null;
    this.shadowRootInstance = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log("Custom element added to page.");

    const propsData = {
      initialPostsPerPage: this.getAttribute('initial-posts-per-page'),
      initialWidgetTitle: this.getAttribute('initial-widget-title'),
    };

    // Create a div inside shadow root to mount Vue component
    const mountPoint = document.createElement('div');
    this.shadowRootInstance.appendChild(mountPoint);

    // Create Vue instance and mount it
    this.vueInstance = new Vue({
      render: h => h(VetstoriaWidget, { props: propsData }),
    });

    this.vueInstance.$mount(mountPoint);
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
    if (this.vueInstance) {
      this.vueInstance.$destroy();
      this.vueInstance = null;
    }
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
    // You can dynamically update props here if needed
  }
}

customElements.define('vetstoria-widget-v4', MyCustomElement);
