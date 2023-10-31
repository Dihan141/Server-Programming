const express = require("express");
const router = express.Router();

const {createProject, viewProjects, updateProject, deleteProject, uploadMultipleImages, uploadMultipleAudios} = require("../controllers/projectController");
const { uploadProjectImage, uploadAudioFile } = require("../middlewares/media.middleware");

router.post("/create-project", createProject)
router.get("/project-info", viewProjects)
router.put("/update-project/:id", updateProject)
router.delete("/delete-project/:id", deleteProject)

//media routes
router.post("/upload/multiple-image/:id", uploadProjectImage.array('images', 10), uploadMultipleImages)
router.post("/upload/multiple-audio/:id", uploadAudioFile.array('audios', 10), uploadMultipleAudios)

module.exports = router

