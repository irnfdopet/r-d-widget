import Vue from 'vue';
import VetstoriaWidget from './VetstoriaWidget.vue';

function mountWidget(targetSelector) {
    const el = document.querySelector(targetSelector);
    console.log("Mounting Vetstoria Widget to:", el);

    const propsData = {
        initialPostsPerPage: el.getAttribute('initial-posts-per-page'),
        initialWidgetTitle: el.getAttribute('initial-widget-title'),
    };

    if (el) {
        new Vue({
            render: h => h(VetstoriaWidget, { props: propsData })
        }).$mount(el);
    }
}

window.mountVetstoriaWidget = mountWidget;