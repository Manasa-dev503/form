require('dotenv').config()
var Register = require("./Register.model")
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.get("/",function(req,res){
    res.sendFile(__dirname+"/Login.html")
})

app.get("/register",function(req,res){
    res.sendFile(__dirname+"/Register.html")
})

app.post("/register1",function(req,res){
   console.log(req.body)
  var newregister = new Register(req.body)
   newregister.save()
   res.redirect("/")
})

app.post("/login",function(req,res){
  //  console.log(req.body)
    Register.find().then(function(data){
      //  console.log(data)
        var logindata = data.filter(function(login){
         //   console.log(login)
            if(login.username === req.body.username && login.password === req.body.password){
               return true
            }
        })
        if(logindata.length!=0){
           res.cookie('username',req.body.username)
            res.cookie('password',req.body.password)
            res.send("Welcome to Dashboard")
        }  
        else{
            res.send("Invalid username or password")
        }      
        
        
    })
})

app.get("/forgotpassword",function(req,res){
    res.sendFile(__dirname+"/Forgotpassword.html")
})

app.post("/reset",function(req,res){
    console.log(req.body)
    
   Register.find({email:req.body.mail}).then(function(data){
   console.log(data)
   var rcopy = JSON.parse(JSON.stringify(data[0]))
  // console.log(rcopy)
   Register.updateOne({password:rcopy.password},{$set:{password:req.body.npassword}}).then(function(res){
   // console.log(res)
   })
   })
   res.send('password updated')
})


app.get("/blogin",function(req,res){
    res.sendFile(__dirname+"/Login.html")
})

app.get("/rlogin",function(req,res){
    res.sendFile(__dirname+"/Login.html")
})




app.listen(process.env.PORT,function(){
    console.log("server is running on "+process.env.PORT)
})