const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3004;

const vueAppPath = path.resolve(__dirname, '..', 'demos', 'demo-4');

app.use(cors());
app.use(express.static(vueAppPath));

// Start the server
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
  console.log(`Serving demo from: ${vueAppPath}`);
});

