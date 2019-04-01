const express = require('express');
const app = express();
const port = 3015;

app.use(function(req, res, next) {
  console.log('fired');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  console.log('someone found me');
  res.send('You have found me');
});

app.listen(port, () => {
  console.log(`Started service on port ${port}`);
});
