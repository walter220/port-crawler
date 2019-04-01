const express = require('express');
const app = express();
const port = 3010;

app.get('/', (req, res) => {
  console.log('someone found me');
  res.send('You have found me');
});

app.listen(port, () => {
  console.log(`Started service on port ${port}`);
});
