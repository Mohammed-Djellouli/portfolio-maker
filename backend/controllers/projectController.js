const Project = require("../models/Project");
const Projet = require("../models/Project");


const createProject = async (req, res) => {

    try {

        //recupération de l'id de l'utilisateur à partir du middleware auth
        const userId = req.auth.userId;
        const { title, description, imageUrl, projectUrl, technologies, links} = req.body;
        const newProject = new Project({
            userId : userId,
            title,
            description,
            imageUrl,
            projectUrl,
            technologies,
            links,
        });


        //save le projet
        await newProject.save();

        res.status(201).json({ message: 'Project created successfully', projectId: newProject._id });
    }catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


const findAllProjects = async (req, res) => {
    try {
        //recupération de l'id user
        const userId = req.params.userId;
        //chercher les projets de l'utilisateur
        const projects = await Project.find({ userId: userId });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


const deleteProject = async (req, res) => {
    try {
        //recupération de l'id du projet à supprimer
        const projectId = req.params.projectId;
        //recupération de l'id de l'utilisateur à partir du middleware auth
        const userId = req.auth.userId;

        //chercher le projet à supprimer
        const project = await Project.findById(projectId);

        //verifier si le projet existe
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        //verifier si le projet appartient à l'utilisateur
        if (project.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        //supprimer le projet
        await Project.deleteOne({ _id: projectId });
        res.status(200).json({ message: 'Project deleted successfully' });
    }catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const updateProject = async (req, res) => {
    try {
        //recupération de l'id du projet à modifier
        const projectId = req.params.projectId;
        //recupération de l'id de l'utilisateur à partir du middleware auth
        const userId = req.auth.userId;
        const { title, description, imageUrl, projectUrl, technologies, links} = req.body;
        //chercher le projet à modifier
        const project = await Project.findById(projectId);

        //verifier si le projet existe
        if(!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        //verifier si le projet appartient à l'utilisateur
        if (project.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        //modifier le projet
        project.title = title || project.title;
        project.description = description || project.description;
        project.imageUrl = imageUrl || project.imageUrl;
        project.projectUrl = projectUrl || project.projectUrl;
        project.technologies = technologies || project.technologies;
        project.links = links || project.links;

        await project.save();
        res.status(200).json({ message: 'Project updated successfully' });
    }catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { createProject, findAllProjects, deleteProject, updateProject};
