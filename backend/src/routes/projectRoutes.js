const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getProjects,
  createProject,
  deleteProject
} = require("../controllers/projectController");

const router = express.Router();

router.get("/", authMiddleware, getProjects);
router.post("/", authMiddleware, createProject);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
