const Post = require('../models/post')


exports.Post = async (req, res ,next) =>{
  const title = req.body.title
  const description = req.body.description
  const email = req.body.email

  const post = new Post({
    title : title,
    description : description,
    createDate : Date.now() + 3600000,
    userId:  req.user,
    email: email

  })
try{
  await post.save()
     console.log('Post created')
     res.redirect('/')
}
 catch(e){
   console.log(e)
 }
  
}

exports.postDeletePost = (req, res, next) => {
  const postId = req.body.id;
  Post.deleteOne({_id : postId, userId :req.user._id})
  .then((result) => {
    console.log('Product Deleted');
    res.redirect('/');
  })
  .catch((err) => {
    console.log(err);
  });
};
