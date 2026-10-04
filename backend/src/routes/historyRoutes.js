const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getHistory,
  addHistory
} = require("../controllers/historyController");

const router = express.Router();

router.get("/", authMiddleware, getHistory);
router.post("/", authMiddleware, addHistory);

module.exports = router;
