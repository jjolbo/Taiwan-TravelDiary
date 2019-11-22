var template = require('./lib/template.js');
var path = require('path');
var mysql = require('mysql');
var express = require('express');
var app = express();
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'980602',
    database: 'diary'
})

db.connect();
// var router = require('./router/main')(app);
app.use(express.static('public'));

app.get('/',function(req,res){
    db.query(`select * from diary`, (error, diary)=>{
        if (error) throw error;

        
    })
    var img = `<div style="position:absolute;top:20%;left:20%;">
    <br/><br/><img src="https://previews.123rf.com/images/amisb/amisb1706/amisb170600176/80950615-colorfaul-%EB%9E%9C%EB%93%9C-%EB%A7%88%ED%81%AC-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8%EA%B3%BC-%EB%8C%80%EB%A7%8C%EC%A7%80%EB%8F%84.jpg" width=30%>
    </div>`;
    var html = template.HTML(img) ;
    res.send(html);
 });

 app.get('/about',function(req,res){
    res.render('about.html');
});


var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

app.use(express.static('public'));
