const express = require("express");

const router = express.Router();

const { getProjectDetails,
        getUserProjectsDetails, 
        createProject,
        deleteProject} = require("../controllers/projectController")

router.get("/:projectId", getProjectDetails);
router.get("/userprojects/:userId", getUserProjectsDetails);
router.post("/:userId", createProject);
router.delete("/:projectId", deleteProject);

module.exports = router;