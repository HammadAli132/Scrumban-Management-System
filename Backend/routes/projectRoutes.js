const express = require("express");
const router = express.Router();
const { getProjectDetails,
        getUserProjectsDetails } = require("../controllers/projectController")

router.get("/:projectId", getProjectDetails);
router.get("/userprojects/:userId", getUserProjectsDetails);

module.exports = router;