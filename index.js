 const express=require('express');
 const app=express();

 const mongoose=require("mongoose");
 const UserCon=require('./Controller/UserCon')
 const bodyParser=require('body-parser');
 const middleware=require('./middleware/signmid')
 const fileupload=require('express-fileupload');
 app.use(express.static('public'))
 app.use(fileupload());
 app.use(bodyParser.json());
 mongoose.connect("mongodb://127.0.0.1:27017/ead");
 app.use(bodyParser.urlencoded({extended:true}));
 app.set('view engine','ejs')
 app.get('/',UserCon.home)
 app.get('/signup',UserCon.signup);
 app.get('/signin',UserCon.signin);
 app.get('/delete/:id',UserCon.Delete)
 app.get('/update/:id',UserCon.Update);
 app.get('/userdata',UserCon.UserData);
 app.post('/save/data',UserCon.UpdateData);
 app.post('/save/signin',middleware.signinMid,UserCon.UserData)
 app.post('/save',UserCon.signupP);
 app.listen(5000,function(){
     console.log("server is listening at port 5000")
 })