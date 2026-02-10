const express = require('express');
const router = express.Router();

const auth= require('../middleware/auth');
const projectController = require('../controllers/projectController');

//routes pour les projets
//route pour créer un projet
router.post('/', auth, projectController.createProject);
//route pour récupérer les projets d'un utilisateur
router.get('/:userId', projectController.findAllProjects);
//route pour supprimer un projet
router.delete('/:projectId', auth, projectController.deleteProject);

module.exports = router;