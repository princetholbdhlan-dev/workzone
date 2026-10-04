const express = require("express");

const {
  getTools,
  getToolBySlug
} = require("../controllers/toolController");

const router = express.Router();

router.get("/", getTools);
router.get("/:slug", getToolBySlug);

module.exports = router;
