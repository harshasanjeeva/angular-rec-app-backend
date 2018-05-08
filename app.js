const yelp = require('yelp-fusion');
const express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var corsOptions = {
 origin: 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
var User = require("./dbm");


mongoose.connect('mongodb://localhost:27017/cmpe280');


const apiKey = '6wQDMzOqQ7lRAzfOyQS0VZsRxL-rspsA6KSm9PSD1CnhjKDl5YDJ789VUpcQUOPNSH5g5ITTZldYWzToQHywVHO0nbk3vb7beHh2QxPlAmpsvqKt01-PI7tGjgzqWnYx';
const client = yelp.client(apiKey);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors(corsOptions));


app.listen(3001, () => console.log('Server running on port 3001'))



app.post('/api', (req, res) => {
  console.log("here in api")
  console.log(req.body.data)
  client.search(req.body.data).then(response => {
  console.log(response)
  res.send(response)

}).catch(e => {
  console.log(e);
})

})



app.post('/login', (req, res) => {
  console.log("here in login")
  console.log(req.body.data)

 
   console.log("request--->",req.body.data.username)
   console.log("request--->",req.body.data.password)
   
   
   var username = req.body.data.username;
   var password = req.body.data.password;

   User.findOne({username:username,password:password}, function(err,user){
       if(err) {
           console.log(err);
           return res.status(500).send();
       }
       if(!user) {
           res.send({"message":"false"});
       } else if (user){
           console.log("success");
           res.send({"message":"true"});        
       }       
   });   
  
})


app.post('/admin', (req, res) => {
  console.log("admin")
  console.log(req.body.data)

 
   console.log("request--->",req.body.data.username)
   console.log("request--->",req.body.data.password)
   
   
   var username = req.body.data.username;
   var password = req.body.data.password;
   var rest = [];

   User.find({}, function(err,users){
       if(err) {
           console.log(err);
           return res.status(500).send();
       }
       if(!users) {
           res.send({"message":"false"});
       } else if (users){
           console.log("success");
           
           res.send(users);        
       }       
   });   
  
})


app.post('/signup', (req, res) => {
  console.log("signup")
  //console.log(req.body.data.username)
  //var db = request.db;
  var username = req.body.data.username;
  var name = req.body.data.name;
  var email = req.body.data.email;
  var phone = req.body.data.phone;
  var password = req.body.data.password;
  var conpassword = req.body.data.conpassword;

  var newUser = new User({name:name,username:username,email:email,phone:phone,password:password});
  
 
 console.log(newUser);
  newUser.save(function(err,savedUser) {
      if(err) {
        res.send("Insert Failed");
      } else {
        res.send({"message":"true"});
      }
  })
  
  
  
})



app.get('/fake', (req, res) => {
  
  console.log("1",)
  
// var encry = cipher.encrypt(req.body.data)
// console.log("cipher",encry)
//  var decry= cipher.decrypt(encry)
// console.log("decry",decry)

  res.send({"message":"fake requests"})
})




