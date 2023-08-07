//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
let items = ['buy food', 'Cook food', 'Eat Food'];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){

  let today = new Date();
  let option = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

let day = today.toLocaleDateString('en-US', option);

  res.render('list', {
    kindOfDay: day,
    newListItems: items
  });

});

app.post('/', function(req, res){
  let item = req.body.newItem

  items.push(item);

  res.redirect('/');

});

app.listen(port, function(){
  console.log('Server is running on port : ' + port);
});
