const express = require('express');
const app = express();

const router = require('./routes');

const PORT = process.env.PORT || 5000;

app.use("/api/v1/", router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});