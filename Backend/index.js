const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {logger} = require('./middleware/logger');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const todoRouter = require('./routes/todoListRoutes');

dotenv.config();
const app = express();

app.use(logger);
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/v1/todos", todoRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});