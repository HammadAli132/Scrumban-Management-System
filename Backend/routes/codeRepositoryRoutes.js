const express = require("express");

const router = express.Router();

const { getCodeRepositoryId } = require("../controllers/codeRepositoryController");

router.get("/repoId/:projectId", getCodeRepositoryId);