const express = require("express")


const router = express.Router();

router.get("/", (req, res) => {
  res.send("Test Routing");
})

module.exports = router;