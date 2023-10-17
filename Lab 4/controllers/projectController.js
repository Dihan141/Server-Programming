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

module.exports = {
    createProject,
    updateProject,
    viewProjects,
    deleteProject
}