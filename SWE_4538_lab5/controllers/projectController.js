const User = require("../dataModels/User.model");
const Project = require("../dataModels/Project.model");

//Project CRUD operations
//create project
const createProject = async(req, res)=>{
    const { name, description } = req.body
    const uid = req.user.id;
  
    const profileInfo = await User.findById(uid);
  
    if (!profileInfo) {
      return res.status(404).json({ error: "User not logged in" });
    }
  
    const newProject = new Project({
      name,
      description,
      uid
    })
  
    newProject.save().then((data)=>{
      res.json(newProject)
    }).catch((err)=>{
      res.json(err)
    })
  }
  
  //view projects
  const viewProjects = async(req, res)=>{
    try {
      const projects = await Project.find({uid: req.user.id});
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  //update project
  const updateProject = async(req, res)=>{
    try{
      const { name, description } = req.body;
  
      const project = await Project.findById(req.params.id)
    
      if(name){
        project.name = name
      }
    
      if(description){
        project.description = description
      }
    
      await project.save()
    
      res.json({msg: "Project updated successfully"})
    }catch(err){
      res.json(err)
    }
  }
  
  //delete project
  const deleteProject = async(req, res)=>{
    try {
      const profileID = req.user.id
      const pid = req.params.id
      const profileInfo = await User.findById(profileID)
  
      if (!profileInfo) {
        return res.status(404).json({ error: "user not logged in" })
      }
  
      await Project.findByIdAndDelete(pid)
  
      res.json({ message: "Project deleted successfully" })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  //Media handling
  const uploadMultipleImages = async(req, res)=>{
    try {
      const pid = req.params.id
      const profileInfo = await User.findById(req.user.id)
      if (!profileInfo) {
        return res.status(404).json({ error: "user not logged in" })
      }

      if(!req.files){
        return res.status(400).json({ message: 'No file provided' })
      }

      const project = await Project.findById(pid)

      if(!project){
        return res.status(400).json({ message: 'Project not found!' })
      }

      const images = req.files.map((file) => {
        project.images.push(file.filename)
      })
      await project.save()

      res.status(200).json({"message": "Images has been uploaded"})
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const uploadMultipleAudios = async(req, res)=>{
    try {
      const pid = req.params.id
      const profileInfo = await User.findById(req.user.id)
      if (!profileInfo) {
        return res.status(404).json({ error: "user not logged in" })
      }

      if(!req.files){
        return res.status(400).json({ message: 'No file provided' })
      }

      const project = await Project.findById(pid)

      if(!project){
        return res.status(400).json({ message: 'Project not found!' })
      }

      const audios = req.files.map((file) => {
        project.audios.push(file.filename)
      })
      await project.save()

      res.status(200).json({"message": "Audios has been uploaded"})
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

module.exports = {
    createProject,
    updateProject,
    viewProjects,
    deleteProject,
    uploadMultipleImages,
    uploadMultipleAudios
}