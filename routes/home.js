const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home')

router.get('/',homeController.getHome );

router.get('/search',homeController.getSearch );
router.post('/search',homeController.postSearch );

router.get('/userposts/:userId',homeController.getUserPost );

router.get('/news',homeController.getNews );


router.get('/updateprofile',homeController.getUpdateProfile );

router.post('/profile',homeController.postUpdateProfile );






module.exports = router
