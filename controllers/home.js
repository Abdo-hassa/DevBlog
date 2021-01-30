const Post = require('../models/post')
const User = require('../models/user')
var mongoose = require('mongoose');
const axios = require("axios");

exports.getHome = async (req, res, next) =>{
  let email
  let userid
  let name
  let bio
  let Image
  try{
    const posts = await Post.find()
    .populate('userId')
      if(req.user){
         email =req.user.email
         userid = req.user._id.toString()
         name = req.user.name
         bio = req.user.bio
         Image = req.user.Image
      }else{
         email = null
         userid =null
         name = null
         bio = null
         Image = null
      }
    // console.log(mongoose.Types.ObjectId.isValid(posts[0].userId));
      res.render('home/index',{
      posts: posts.reverse(),
      email:email,
      userid : userid,
      name: name,
      bio: bio,
      Image:Image
      })
  }
  catch(e){
    console.log(e)
  }
}

exports.getUserPost = async (req, res, next) =>{
  let email
  let name
  let bio
  let Image

  const userid = req.params.userId
  // console.log(userid)
 const userId = req.user._id.toString()

 try{
   const posts = await Post.find({userId : userid})
   .populate('userId')
  
   // console.log(posts[0].userId.name)
     if(req.user){
        email =req.user.email
        name = req.user.name
        bio = req.user.bio
        Image = req.user.Image

     }else{
        email = null
        name = null
        bio = null
        Image = null

     }
     res.render('home/userposts' ,{
     posts: posts.reverse(),
     email:email,
     name: name,
     bio: bio,
     userid : userId,
     Image:Image

     })
 }
 catch(e){
   console.log(e)
 }
    
}


exports.getUpdateProfile = async (req, res, next) =>{
  let email
  let userid
  let name
  let bio
  let Image

  try{
    const posts = await Post.find()
     .populate('userId')
     
       if(req.user){
          email =req.user.email
          userid = req.user._id
          name = req.user.name
          bio = req.user.bio
          Image = req.user.Image

       }else{
          email = null
          userid= null
          name = null
          bio = null
          Image = null

       }
       res.render('home/updateprofile',{
       posts: posts.reverse(),
       email:email,
       userid : userid,
       name: name,
       bio: bio,
       Image:Image

       })
       
  }
  catch(e){
    console.log(e)
  }

}

exports.postUpdateProfile = async(req, res, next) =>{
  const userid = req.body.userid
  const name = req.body.name
  const bio = req.body.bio
  const image = req.file
  const Image= image.path
  try{
  const user = await User.findOne({_id : userid})
     user.name = name
     user.bio = bio
     if(image){
       user.Image = Image
     }
     user.save()
     res.redirect('/')
  }
  catch(e){
    console.log(e)
  }
}


exports.getSearch = (req, res, next) =>{
  let email
  let userid
  let name
  let bio 
  let Image
    if(req.user){
       email =req.user.email
       userid = req.user._id
       name = req.user.name
       bio = req.user.bio
       Image = req.user.Image

    }else{
       email = null
       userid=null
       name = null
       bio = null
       Image = null

    }
           // console.log(posts)
           res.render('home/search' ,{
             email:email,
             userid : userid,
             name: name,
             bio: bio,
             posts : [],
             Image:Image

             })
    


  }

  exports.postSearch = async (req, res, next) =>{
    let email
    let userid
    let name
    let bio
    let Image
    const term = req.body.term
      if(req.user){
         email =req.user.email
         userid = req.user._id.toString()
         name = req.user.name
         bio = req.user.bio
         Image = req.user.Image

      }else{
         email = null
         userid=null
         name = null
         bio = null
         Image=null
      }
      try {

  const posts = await Post.find({
   $text: { $search: term },}).populate('userId')
           // console.log(posts)
           res.render('home/search',{
             email:email,
             userid : userid,
             name: name,
             bio: bio,
             posts : posts.reverse(),
             term:term,
             Image:Image

             })
      }
      catch(e){
        console.log(e)
      }
     
    }


exports.getNews = async (req, res, next) =>{
  const BASE_URL = `https://dev.to/api/articles`

  try{
    const news = await axios.get(BASE_URL)
     

  let News = news.data
  let email
  let userid
  let name
  let bio
  let Image

    if(req.user){
       email = req.user.email
       userid = req.user._id.toString()
       name = req.user.name
       bio = req.user.bio
       Image = req.user.Image

    }else{
       email = null
       userid= null
       name = null
       bio = null
       Image=null

    }
console.log(News)
    res.render('home/news',{
      email:email,
      userid : userid,
      name: name,
      bio: bio,
      news : News,
      Image:Image

      })
  }
 catch (e) {
  console.log(e)
}

}
  
