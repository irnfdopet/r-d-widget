<template>
  <section>
    <div class="container">
      <h2 class="mb-2">{{ this.initialWidgetTitle }}</h2>
      <h3 class="mb-2">Posts List</h3>
      <!-- <ul class="nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul> -->
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
  name: 'App',
  props: {
    initialWidgetTitle: {
      required: true,
      type: String,
    },
    initialPostsPerPage: {
      required: true,
      type: Number,
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
  },
  mounted() {
    this.fetchPosts();
  }
};
</script>

<style scoped>
/* @import './app.css'; */
h1,
h2,
h3 {
  color: green;
}

@media screen and (min-width: 992px) {
  .vs-table {
    max-width: 75%;
    margin: 0 auto;
  }
}
</style>
