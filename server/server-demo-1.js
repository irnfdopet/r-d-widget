const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// const vueAppPath = path.resolve(__dirname, '..', 'app-vue', 'dist');
const vueAppPath = path.resolve(__dirname, '..', 'app-vue-2', 'dist');

app.use(cors());
app.use(express.static(vueAppPath));

// Start the server
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
  console.log(`Serving Vue app from: ${vueAppPath}`);
});

