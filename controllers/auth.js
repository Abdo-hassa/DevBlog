const User = require("../models/user")
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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',
    },
  }),
);

//Login

//Get login page

exports.getLogin = (req, res, next) =>{
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login',{
    pageTitle : 'Login',
    errorMassage: message
  })
}

//Post Login
exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({email : email})
  .then(user =>{
    if(!user){
      req.flash('error', 'invalid email or password');
      res.redirect('/login')
    }
    return bcrypt.compare(password , user.password)
    .then(ismatch =>{
      if(ismatch){
        req.session.isLoggedin = true;
        req.session.user = user;
        return req.session.save(err =>  {
            console.log(err)
            res.redirect('/')
          })
      }

      req.flash('error', 'invalid email or password');
      res.redirect('/login');

    }).catch(err =>{
      res.redirect('/login')
      console.log(err)
    })
  })
  .catch(err =>{
    console.log(err)
  })

}

//logout

//Post logout page
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};




//Registeration

//get register page 
exports.getRegister = (req, res, next) =>{
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/register',{
    pageTitle : 'Registeration',
    errorMassage: message,

  })
}

//post register
exports.postRegister = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({email : email})
  .then(user =>{
    if(user){
      req.flash('error', 'E-mail is already exist');
      return res.redirect('/register')
    }
    return bcrypt.hash(password ,12)
    .then(hashedpass =>{
        const user = new User({
          email : email,
          password : hashedpass
        })
        return user.save()
    }).then(() =>{
      res.redirect('/login')
      return transporter
            .sendMail({
              to: email,
              from: 'abdallahhassann1998@gmail.com',
              subject: 'Signup succeeded !',
              html: '<h1> You successfully signed up<h1>',
            }).catch((err) => {
              console.log(err);
            });
    })
  })
  .catch(err =>{
    console.log(err)
  })

}
