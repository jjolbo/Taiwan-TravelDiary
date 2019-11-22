module.exports = {
    HTML:function(control){
      return `
      <!doctype html>
      <html>
      <head>
        <title>Taiwan Travel Diary</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="stylesheet" type="text/css" href="css/style.css">
      </head>
      <body>
        <h1 style="text-align: center;">Taiwan Travel Diary</h1>
        <!-- <div id="map"></div> -->
        <!-- <button type="button" class="btn btn-primary">맛집</button> -->
        <script type="tex/javascript" src="js/bootstrap.js"></script>
        <!-- <script>
            var map;
            function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 23.905254, lng: 121.085753},
                zoom: 7
            });
            }
        </script> -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <!-- <script src="https://maps.googleapis.com/maps/api/js?key=key&callback=initMap"
        async defer></script> -->
        ${control}
      </body>
      </html>
      `;
    },list:function(filelist){
      var list = '<ul>';
      var i = 0;
      while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
      }
      list = list+'</ul>';
      return list;
    }
  }
  
