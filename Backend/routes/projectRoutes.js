const express = require("express");
const router = express.Router();
const { getProjectDetails } = require("../controllers/projectController")

router.get("/:projectId", getProjectDetails);