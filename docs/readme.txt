app-vue-2
=========
npm install -g @vue/cli
vue create app-vue-2


Builds
======
lib (Library)
-------------
npm run build:lib

wc (Web Component)
------------------
npm run build:wc


Netlify Server
==============
https://demo-widget-server.netlify.app/
https://demo-widget-v2.netlify.app


======
WIDGET
======

dynamically generated css
---
https://oabp.dev.io/booking/api/css/widget?customisation=3866a3,63b8ee,3866a3,ff0000,97c4fe,97c4fe,63b8ee,63b8ee,63b8ee,064f7d


GTM
---
?utm_source=google&utm_medium=cpc
/?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&utm_term=mens+shoes&utm_content=button

Regular click (Data Layer)
--------------------------
{
  event: "gtm.click",
  gtm: {
    uniqueEventId: 18,
    start: 1755085015208,
    element: "HTMLButtonElement: html > body > main.main-content.my-4" +
             " > div.container > button#vg-btn-1",
    elementClasses: "",
    elementId: "vg-btn-1",
    elementTarget: "",
    triggers: "4,5",
    elementUrl: ""
  },
  method: "WC Widget \"Step 3\" Button"
}

WC click (Data Layer)
---------------------
{
  event: "gtm.click",
  gtm: {
    uniqueEventId: 16,
    start: 1755085015208,
    element: "HTMLElement: html > body > main.main-content.my-4 > div" +
             ".container > vetstoria-widget",
    elementClasses: "",
    elementId: "",
    elementTarget: "",
    triggers: "4,5",
    elementUrl: ""
  },
  method: "WC Widget \"Step 4\" Button"
}


