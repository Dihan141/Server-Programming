const express = require("express");
const router = express.Router();

const {createProject, viewProjects, updateProject, deleteProject} = require("../controllers/projectController")

router.post("/create-project", createProject)
router.get("/project-info", viewProjects)
router.put("/update-project/:id", updateProject)
router.delete("/delete-project/:id", deleteProject)

module.exports = router

