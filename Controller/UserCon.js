const User=require('../models/User');
const home=async (req,res)=>{
    res.render('home');
}
const Update=async (req,res)=>{
    const {id}=req.params;
    const prod= await User.findById(id);
    console.log(prod)
    res.render("update",{prod:prod});
}
const UpdateData=async(req,res)=>{
    const {id,Username,Email,Password}=req.body;
    const img=req.files.img;
    await User.updateOne({_id:id},{$set:{Username:Username,Email:Email,Password:Password,image:img.name}})
    img.mv(`./public/img`+img.name,(err)=>{
        if(err)
            console.log('error');
        else
            console.log("Updated")
    })
    res.redirect('/');
}
const Delete= async(req,res)=>{
    const {id}=req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/userdata');
}
const signup=(req,res)=>{
    res.render('signup')
}
const UserData=async (req,res)=>{
    const data=await User.find();
    res.render("UserData",{data:data});
}
const signin=(req,res)=>{
    res.render('signin');
}
const signupP=async (req,res)=>{
    const {Username,Email,Password}=req.body;
    const img=req.files.img;
    const data=await User.create({Username,Email,Password,image:img.name},(err,prod)=>{
        console.log(prod);
    })
    img.mv(`./public/img/`+img.name,async(err)=>{
        if(err)
            console.log('error')
        else
            console.log("Uploaded");
    })
    res.redirect('/signin')
}
module.exports={home,signup,signupP,signin,Delete,Update,UpdateData,UserData};