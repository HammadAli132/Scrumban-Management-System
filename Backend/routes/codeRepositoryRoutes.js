const express = require("express");

const router = express.Router();

const { getCodeRepositoryId,
        getAllCommits, 
        updateCommitStatus} = require("../controllers/codeRepositoryController");

router.get("/repoId/:projectId", getCodeRepositoryId);
router.get("/commits/:repoId", getAllCommits);
router.put("/commit/:commitId", updateCommitStatus);

module.exports = router;