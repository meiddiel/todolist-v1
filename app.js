//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
let items = ['buy food', 'Cook food', 'Eat Food'];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res){

  let today = new Date();
  let option = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

let day = today.toLocaleDateString('en-US', option);

  res.render('list', {
    listTitle: day,
    newListItems: items
  });

});

app.post('/', function(req, res){

  let item = req.body.newItem;

  if (req.body.list === 'Work'){
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});

app.get('/work', function(req, res){
  res.render('list', {
    listTitle: 'Work List',
    newListItems:workItems 
  });
});

app.get('/about', function(req, res){
  res.render('about');
});

app.listen(port, function(){
  console.log('Server is running on port : ' + port);
});
