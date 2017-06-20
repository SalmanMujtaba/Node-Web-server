const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

//code to set the directory for partials. Partials are
//peiece of code which is redundant ex header and footer
hbs.registerPartials(__dirname+'/views/partials');
//view folder is to be created
app.set('view engine', 'hbs');
//helper functions helps in sharing data with the web pages
//we can simply use it in our pages as {{year}}
hbs.registerHelper('year',()=>{
  return new Date().getFullYear();
});
//this is used to create a log file
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = now+' '+req.url+' '+req.method;
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err) {
      console.log('error in append to server.log')
    }
  });
  next();
});


app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});
// app.get('/',(req,res) => {
//   res.send({
//     name: 'Salman',
//     likes:['Biking','Fishing']
//   });
// });

app.get('/bad',(req,res) =>{
  res.send('Bad request');
});

app.get('/', (req,res)=> {
  res.render('home.hbs',{
    pageTitle: 'Welcome',
  });
});
app.listen(3000);
