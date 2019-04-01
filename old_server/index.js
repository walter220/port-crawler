const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const startPort = 3001;
const endPort = 3020;

app.get('/', (req, res) => {
  for (let index = startPort; index < endPort; index++) {
    console.log(`searching port ${index}`);
    axios
      .get(`http://localhost:${index}`)
      .then(res => {
        console.log(`Ok at ${index}`);
        console.log(`Response: ${res.data}`);
      })
      .catch(() => {
        console.log(`Nothing at ${index}`);
      })
      .then(() => {
        console.log('===================');
      });
  }
  res.send('See cmd line');
});

app.listen(port, () => {
  console.log(`Starting crawler on port ${port}`);
});
