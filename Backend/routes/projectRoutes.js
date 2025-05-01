const express = require("express");

const router = express.Router();

const { getProjectDetails,
        getUserProjectsDetails, 
        createProject,
        deleteProject,
        isUserProjectOwner
    } = require("../controllers/projectController")

router.get("/:projectId", getProjectDetails);
router.get("/userprojects/:userId", getUserProjectsDetails);
router.post("/:userId", createProject);
router.delete("/:projectId", deleteProject);
router.post("/isowner/:projectId", isUserProjectOwner);

module.exports = router;