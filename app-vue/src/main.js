import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue';
import App from './App.vue'
import createWebComponent from 'vue-web-component-wrapper'
import { createI18n } from 'vue-i18n'

// createApp(App).mount('#app')

export const pluginsWrapper = {
  install(GivenVue) {
    const Vue = GivenVue;

    // Vuex
    // const createdStore = createStore(store);
    // Vue.use(createdStore);

    // Or Pinia
    // const pinia = createPinia();
    // Vue.use(pinia);

    // Vue Router
    // const router = createRouter({
    //   history: createWebHashHistory(),
    //   routes: defaultRoutes,
    // });
    // Vue.use(router);

    // Vue I18n
    const i18n = createI18n({
      locale: 'en',
      fallbackLocale: 'en',
    });
    Vue.use(i18n);
  },
};

createWebComponent({
    rootComponent: App,
    elementName: 'vetstoria-widget',
    plugins: pluginsWrapper,
    //   cssFrameworkStyles: tailwindStyles,
    VueDefineCustomElement,
    h,
    createApp,
    getCurrentInstance,
    disableStyleRemoval: false,
    disableShadowDOM: false,
    replaceRootWithHostInCssFramework: false,
});
