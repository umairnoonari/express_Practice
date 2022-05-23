const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');
const UserSchema=new Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },

})
UserSchema.pre('save',function(next){
    const user=this;
    bcrypt.hash(user.Password,5,function(err,hash){
        user.Password=hash;
        next();
    })
})
const User=mongoose.model("User",UserSchema);
module.exports=User;