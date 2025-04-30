const express = require('express');
const cors = require('cors');
const { logger } = require('./middleware/logger.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { initDB } = require('./utils/initDB.js');


// All Routes
const authRouter = require('./routes/authRoutes.js');
const todoRouter = require('./routes/todoListRoutes.js');
const reminderRouter = require("./routes/reminderRoutes.js");
const projectRouter = require("./routes/projectRoutes.js");
const sprintRouter = require("./routes/sprintRoutes.js");
const collaboratorRouter = require("./routes/collaboratorRoutes.js");
const meetingNoteRouter = require("./routes/meetingNoteRoutes.js");

dotenv.config();
const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


// use the routers
app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/reminders", reminderRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/sprints", sprintRouter);
app.use("/api/v1/collaborators", collaboratorRouter);
app.use("/api/v1/meeting-notes", meetingNoteRouter);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	try {
		mongoose.connect("mongodb://localhost:27017/scrumbandb");
		console.log(`Connected to MongoDB`);
		//initDB();
		console.log(`Server is running at http://localhost:${PORT}`);

	} catch (error) {
		console.log(`Error connecting to MongoDB: ${error.message}`);
	}
});