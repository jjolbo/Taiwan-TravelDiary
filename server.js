var template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');
var path = require('path');
var qs = require('querystring'); 
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

app.use(express.static('public'));


app.get('/',function(req,res){
    db.query(`select * from diary`, (error, diary)=>{
        if (error) throw error;

        var img = `<div style="position:absolute;top:20%;left:20%;">
        <br/><br/><img src="https://previews.123rf.com/images/amisb/amisb1706/amisb170600176/80950615-colorfaul-%EB%9E%9C%EB%93%9C-%EB%A7%88%ED%81%AC-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8%EA%B3%BC-%EB%8C%80%EB%A7%8C%EC%A7%80%EB%8F%84.jpg" width=30%>
        </div>`;
        var btn = `<button onclick="location.href='/create'" type="button" class="btn btn-default">글 작성</button>`;
        var html = template.HTML(btn,img,'');
        html += `<div style="position:absolute;top:23%;left:50%;">` + template.day_list(diary,-1) + `</div>`;
        
        res.send(html);
    }); 
 });

app.get('/:pageDay/:pageArea/:pageId',function(req,res){
    // var fileteredId = path.parse(req.params.pageId).base;
    // console.log('enter');
    db.query(`select * from diary`, (error, diary)=>{
        
        if (error) throw error;
        var day = req.params.pageDay;
        var id = req.params.pageId;
        var area = req.params.pageArea;
        var sanitizedDay = sanitizeHtml(day);
        var sanitizedID = sanitizeHtml(id);

        console.log(id);
        console.log(sanitizedDay);

        console.log(diary[id-1].lng, diary[id-1].lat);
        var descriptions = diary[id-1].description;
        var lng = diary[id-1].lng;
        var lat = diary[id-1].lat;
        
        var btn = 
        `<button onclick="location.href='/create'" type="button" class="btn btn-default">글 작성</button>
        <button onclick="location.href='/update/${id}'" type="button" class="btn btn-primary">글 수정</button>
        <div style="position:absolute;top:0%;right:-50%;">
        <form action="/delete_process" method="post">
        <input type="hidden" name="id" value="${sanitizedID}">
        <input type="submit" class="btn btn-secondary" value="글 삭제">
        </form>
        </div>
        `;
        var detail = 
        `<div id="map"></div>
        <script src="https://maps.googleapis.com/maps/api/js?key=APIKEY&callback=initMap"></script>
        <script>
    
          var map;
          function initialize() {
            var mapOptions = {
              zoom: 15,
              center: {lat: ${lat}, lng: ${lng}}
            };
            map = new google.maps.Map(document.getElementById('map'),
                mapOptions);
    
            var marker = new google.maps.Marker({
              position: {lat: ${lat}, lng: ${lng}},
              map: map
            });
            var infowindow = new google.maps.InfoWindow({
              content: '<p>Marker Location:' + marker.getPosition() + '</p>'
            });
    
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map, marker);
            });
          }
    
          google.maps.event.addDomListener(window, 'load', initialize);
        </script>`;
        var description = `<h3>${area}</h3><p>${descriptions}</p>`;
        var html = template.HTML(btn, detail, description);

        html += `<div style="position:absolute;top:23%;left:20%;">` + template.day_list(diary,day) + `</div>`;
        
        res.send(html);
    });
});

app.get('/create',function(req,res){
    db.query(`select * from diary`, (error, diary)=>{
        var html = template.create();
        res.send(html);
    });
});

app.post('/create_process',function(req,res){
    var body = '';
    req.on('data', (data)=>{
        body = body+data;
    });
    req.on('end',()=>{
        var post = qs.parse(body);

        db.query(`INSERT INTO diary (id, day, area, category, lat, lng, description) VALUES(?,?,?,?,?,?,?)`,
        [post.id, post.day, post.area, post.category, post.lat, post.lng, post.description],(err, result)=>{
            res.redirect('/');
        });
    });
});

app.get('/update/:pageId',function(req,res){
    var id = req.params.pageId;

    db.query(`select * from diary`, (error, diarys)=>{
        if(error) throw error;
        // console.log('id',id);
        // console.log(diarys);   
        db.query(`select * from diary where id=?`,[id], (error2, diary)=>{
            if (error2) {
                throw error;
            }
            var html = template.update(diary);
            res.send(html);
        });
    });
});

app.post('/update_process',function(req,res){
    var body = '';
    req.on('data', (data)=>{
        body = body + data;
    });
    req.on('end', ()=>{
        var post = qs.parse(body);
        db.query('UPDATE diary SET day=?, area=?, category=?, lat=?, lng=?, description=? WHERE id=?',
        [post.day, post.area, post.category, post.lat, post.lng, post.description, post.id], (error, result)=>{
            console.log(post.id);
            res.redirect(`/${post.day}/${post.area}/${post.id}`);
        });
    });
});


app.post('/delete_process',function(req,res){
    var body = '';
    req.on('data', (data)=>{
        body = body + data;
    });
    req.on('end', ()=>{
        var post = qs.parse(body);
        db.query('DELETE FROM diary WHERE id=?', [post.id],(error, result)=>{
            if(error) throw error;
            res.redirect('/');
        });
    });
});

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});
