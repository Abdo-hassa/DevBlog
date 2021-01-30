const express = require('express');

const router = express.Router();

const postController = require('../controllers/post')


router.post('/post',postController.Post);

router.post('/delete-post',postController.postDeletePost);




module.exports = router

