const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postsSchema = new Schema({
  title : {
    type : String ,
    required : true
  },
  description :{
    type : String ,
    required : true
  },
  createDate : Date, 
  
  userId : {
    type : Schema.Types.ObjectId,
    ref  : 'User',
    required : true
  },

})

postsSchema.index({
  title: 'text',
  description: 'text',
}, {
  weights: {
    name: 5,
    description: 1,
  },
});

module.exports = mongoose.model('Post', postsSchema)