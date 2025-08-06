import Vue from 'vue';
import VetstoriaWidget from './App.vue';

// This is a simple wrapper for Vue 2 to create a custom element.
// For a more robust solution, especially if you have complex props/events,
// consider using a library like 'vue-custom-element' (npm install vue-custom-element).

// Basic approach without a wrapper library:
// You'd manually create an instance and mount it.
// This example assumes a simple component. For full web component features
// (shadow DOM, attribute/prop reflection), a dedicated wrapper is recommended.

class VetstoriaWidgetElement extends HTMLElement {
  constructor() {
    super();
    this.vm = null;
  }

  connectedCallback() {
    // Get initial attributes and pass them as props
    const props = {};
    for (let i = 0; i < this.attributes.length; i++) {
      const attr = this.attributes[i];
      // Convert kebab-case attributes to camelCase props
      const propName = attr.name.replace(/-(\w)/g, (_, c) => c.toUpperCase());
      props[propName] = attr.value;
    }

    this.vm = new Vue({
      render: h => h(VetstoriaWidget, { props: props }),
    }).$mount();

    this.appendChild(this.vm.$el);

    // Observe attribute changes and update Vue props
    // This is a simplified example; a full implementation would need to handle specific attributes
    // and their types (e.g., parsing numbers/booleans).
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          const propName = mutation.attributeName.replace(/-(\w)/g, (_, c) => c.toUpperCase());
          if (this.vm && this.vm.$children[0] && this.vm.$children[0].$props) {
            this.vm.$children[0].$props[propName] = this.getAttribute(mutation.attributeName);
          }
        }
      });
    });
    observer.observe(this, { attributes: true });
  }

  disconnectedCallback() {
    if (this.vm) {
      this.vm.$destroy();
      this.vm.$el.remove();
    }
  }

  // Define observed attributes for the MutationObserver
  static get observedAttributes() {
    return ['initial-posts-per-page', 'initial-widget-title'];
  }
}

customElements.define('vetstoria-widget', VetstoriaWidgetElement);