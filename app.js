const yelp = require('yelp-fusion');
const express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


const apiKey = '6wQDMzOqQ7lRAzfOyQS0VZsRxL-rspsA6KSm9PSD1CnhjKDl5YDJ789VUpcQUOPNSH5g5ITTZldYWzToQHywVHO0nbk3vb7beHh2QxPlAmpsvqKt01-PI7tGjgzqWnYx';
const client = yelp.client(apiKey);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors(corsOptions));


app.listen(3001, () => console.log('Server running on port 3001'))



app.post('/api', (req, res) => {
  
  console.log(req.body)
  console.log("query",req.body.data.query)
  console.log("query",req.body.data.ll)
  //req.body.data.ll
  //var longe = 123;
  var encry = cipher.encrypt('123')
  console.log("cipher",encry)
   var decry= cipher.decrypt(encry)
  console.log("decry",decry)



  client.search(req.body.data.searchRequest).then(response => {
  res.send(response)
}).catch(e => {
  console.log(e);
})

})

app.post('/fake', (req, res) => {
  
  console.log("1",)
  
// var encry = cipher.encrypt(req.body.data)
// console.log("cipher",encry)
//  var decry= cipher.decrypt(encry)
// console.log("decry",decry)

  res.send({"message":"fake requests"})
})




