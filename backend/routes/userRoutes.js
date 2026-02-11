const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/infos/:userId', authController.getUserInfos);
router.get('/portfolio/:userId', authController.getUserInfos);

module.exports = router;