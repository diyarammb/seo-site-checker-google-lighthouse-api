const express = require("express");
const router = express.Router();
const ApiController = require("../controller/ApiController");
router.post("/site-check", ApiController);

module.exports = router;
