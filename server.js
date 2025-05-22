require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const XAI_API_KEY = process.env.XAI_API_KEY || 'xai-INeSGeTVfdJC9QCPlO2nkjHPuepPB2vUq32YwYPuFD6bBVpxyYhvqRgyWlACpLkUxZ03tHmJEDVZcE5B';

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const response = await axios.post('https://api.x.ai/v1/chat/completions', {
      model: "gpt-4",
      messages: messages,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${XAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error calling xAI API:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

app.listen(port, () => {
  console.log(`DeepSleep backend running on port ${port}`);
});
