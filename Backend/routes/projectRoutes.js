const express = require("express");

const router = express.Router();

const { getProjectDetails,
        getUserProjectsDetails, 
        createProject} = require("../controllers/projectController")

router.get("/:projectId", getProjectDetails);
router.get("/userprojects/:userId", getUserProjectsDetails);
router.post("/:userId", createProject);