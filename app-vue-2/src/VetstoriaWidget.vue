<template>
  <section>
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
    <div class="container">
      <button class="btn btn-primary" @click="sendEventToGA">Click to track GA event</button>
    </div>
    <div class="container">
      <h2 class="mb-2">{{ this.initialWidgetTitle }} (h2)</h2>
      <ul>
        <li>Bootstrap is loading</li>
        <li>CSS media query is working</li>
      </ul>
      <hr>
      <h2 class="mb-2">Posts List (h2)</h2>
      <div>
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
      postsPerPage: this.initialPostsPerPage
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
    }
  },
  mounted() {
    // Fetch posts when the component is mounted
    this.fetchPosts();
  },
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css');
@import './app.css';
</style>
