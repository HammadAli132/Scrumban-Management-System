const express = require("express");

const router = express.Router();

const { getCodeRepositoryId,
        getAllCommits, 
        updateCommitStatus,
        addCommit
    } = require("../controllers/codeRepositoryController");

router.get("/repoId/:projectId", getCodeRepositoryId);
router.get("/commits/:repoId", getAllCommits);
router.put("/commit/:commitId", updateCommitStatus);
router.post("/commit/:repoId", addCommit);

module.exports = router;