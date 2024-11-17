const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Default route for testing the server
app.get('/', (req, res) => {
  res.send('<h1>CC Sorter Backend is Running!</h1><p>Use the POST /parse endpoint to parse CC data.</p>');
});

// Parsing route to process messy credit card data
app.post('/parse', (req, res) => {
  const messyText = req.body.text;
  const regex = /(\d{13,16})[\|\/\s]*(\d{2})[\|\/]*(\d{2})[\|\/]*(\d{3,4})/g;
  let matches = [...messyText.matchAll(regex)];

  const neatNumbers = matches.map(
    ([_, cc, mm, yy, cvv]) => `${cc}|${mm}|${yy}|${cvv}`
  );
  res.json({ sorted: neatNumbers });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));