const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { logger } = require('./middleware/logger');
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
	try {
		mongoose.connect("mongodb://localhost:27017/scrumbandb");
		console.log(`Connected to MongoDB`);
		console.log(`Server is running at http://localhost:${PORT}`);
	} catch (error) {
		console.log(`Error connecting to MongoDB: ${error.message}`);
	}
});