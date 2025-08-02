import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import App from './App.vue';

// Wrap the Vue component and define it as a custom element
const CustomElement = wrap(Vue, App);
window.customElements.define('vetstoria-widget', CustomElement);