<template>
  <section>
    <!-- Bootstrap nav -->
    <div class="container">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>

    <hr>

    <!-- Buttons: send event to Google Tag Manager (GTM) -->
    <div class="container">
      <button class="btn btn-info my-4 mx-2" @click="sendEventToGTMStep1">Step 1</button>
      <button class="btn btn-info my-4 mx-2" @click="sendEventToGTMStep2">Step 2</button>
      <button class="btn btn-info my-4 mx-2" @click="sendEventToGTMStep3">Step 3</button>
      <button class="btn btn-info my-4 mx-2" @click="sendEventToGTMStep4">Step 4</button>
    </div>

    <hr>

    <!-- Button: send event to Google Analytics (GA) -->
    <div class="container">
      <button class="btn btn-primary my-4" @click="sendEventToGA">Click to track GA event</button>
    </div>

    <hr>

    <!-- Button: append query string -->
    <div class="container">
      <button class="btn btn-secondary my-4" @click="appendMessageToUrl">Append Message</button>
    </div>

    <hr>

    <!-- Widget information -->
    <div class="container">
      <h1>Heading One (h1)</h1>
      <h2 class="mb-2">{{ this.initialWidgetTitle }} (h2)</h2>
      <ul>
        <li>Bootstrap is loading</li>
        <li>CSS media query is working</li>
      </ul>
    </div>

    <hr>

    <!-- GTM query string parameters -->
    <div class="container">
      <h2 class="mb-2">GTM parameters</h2>
      <div>
        <p v-if="widget.hasGtmParams">GTM parameters detected on the client's site!</p>
        <ul v-if="widget.hasGtmParams">
          <li v-for="([key, value], index) in utmEntries" :key="index">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
        <p v-else>No GTM parameters found.</p>
      </div>
    </div>

    <hr>

    <!-- Posts List -->
    <div class="container">
      <h2 class="mb-2">Posts List (h2)</h2>
      <table class="vs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in paginatedPosts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VetstoriaWidget',
  props: {
    initialWidgetTitle: {
      required: false,
      type: String,
      default: "Vetstoria Widget"
    },
    initialPostsPerPage: {
      required: false,
      type: [Number, String],
      default: 5
    }
  },
  data() {
    return {
      posts: [],
      currentPage: 1,
      postsPerPage: this.initialPostsPerPage,
      widget: {
        hasGtmParams: false,
        utmParameters: {}
      }
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.posts.length / this.postsPerPage);
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      return this.posts.slice(start, start + this.postsPerPage);
    },
    prevButtonState() {
      return this.currentPage === 1;
    },
    nextButtonState() {
      return this.currentPage === this.totalPages;
    },
    utmEntries() {
      return Object.entries(this.widget.utmParameters || {});
    }
  },
  methods: {
    fetchPosts() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
          this.posts = data;
        });
    },
    goToPage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    sendEventToGA() {
      console.log('Button clicked in widget');

      // Dispatch a custom event to the host page
      this.$emit('widget-ga-interaction', {
        action: 'button_clicked',
        label: 'WC Widget "Click to track GA event" Button'
      });
    },
    appendMessageToUrl() {
      const message = 'this-is-a-test';
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.append('widgetMessage', message);
      window.history.pushState({}, '', currentUrl.toString());
    },
    detectGtmParams() {
      // Use a try-catch block for safety, as some environments might restrict access
      try {
        const urlParams = new URLSearchParams(window.location.search);
        console.log('Current URL Parameters:', Object.fromEntries(urlParams.entries()));

        // A list of common GTM/UTM parameters to check for
        const gtmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];

        gtmParams.forEach(param => {
          if (urlParams.has(param)) {
            this.widget.hasGtmParams = true;
            this.widget.utmParameters[param] = urlParams.get(param);
          }
        });

        if (this.widget.hasGtmParams) {
          console.log('Detected GTM Parameters:', this.widget.utmParameters);
          // Now you can use this data, e.g., to pass it to a backend or for internal logic
        }

      } catch (error) {
        console.error('Could not access window.location.search:', error);
      }
    },
    displayClientData() {
      const { dataLayer } = window;
      console.log('Detecting client document...', document);
      console.log('Detecting client window...', window);
      console.log('Detecting client GTM dataLayer...', dataLayer);
    },
    sendEventToGTMStep1() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(
        {
          'event': 'wc_widget_step1',
          'method': 'WC Widget "Step 1" Button'
        });
    },
    sendEventToGTMStep2() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(
        {
          'event': 'wc_widget_step2',
          'method': 'WC Widget "Step 2" Button'
        });
    },
    sendEventToGTMStep3() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(
        {
          'event': 'wc_widget_step3',
          'method': 'WC Widget "Step 3" Button'
        });
    },
    sendEventToGTMStep4() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(
        {
          'event': 'wc_widget_step4',
          'method': 'WC Widget "Step 4" Button'
        });
    }
  },
  mounted() {
    // Fetch posts when the component is mounted
    this.fetchPosts();
    this.detectGtmParams();
    this.displayClientData();
  },
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css');
@import './app.css';
</style>
