const express = require("express");

const router = express.Router();

const { getCodeRepositoryId,
        getAllCommits } = require("../controllers/codeRepositoryController");

router.get("/repoId/:projectId", getCodeRepositoryId);
router.get("/commits/:repoId", getAllCommits);