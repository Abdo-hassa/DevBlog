const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth')

router.get('/login',authController.getLogin );

router.post('/login',authController.postLogin );

router.post('/logout',authController.postLogout );

router.post('/userposts/logout',authController.postLogout );


router.get('/register',authController.getRegister );

router.post('/register',authController.postRegister );





module.exports = router
