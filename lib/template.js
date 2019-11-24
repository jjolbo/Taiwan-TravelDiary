module.exports = {
    HTML:function(btn,control,list){
      return `
      <!doctype html>
      <html>
      <head>
        <title>Taiwan Travel Diary</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="http://localhost:3000/css/style.css">
      </head>
      <body>
        <br/>
        <h1 style="text-align: center;"><a href="/">Taiwan Travel Diary</a></h1>
        
        <div style="position:absolute;top:3%;right:20%;">
        ${btn} 
        </div>
        ${control}
        <div style="position:absolute;top:50%;left:20%;">
        ${list}
        </div>
        <script type="tex/javascript" src="js/bootstrap.js"></script>
        
      </body>
      </html>
      `;
    },day_list:function(filelist, day){

        var list = '<ul>';
        // var i = 0;
        var d, tmp = 1;
        var tmp_list = new Array();

        for (var i= 0; i < filelist.length; i++){
            d = filelist[i].day;
            if(parseInt(d) == day){
                list = list + `<li><a href="/${filelist[i].day}/${filelist[i].area}/${filelist[i].id}">${filelist[i].area}</a></li>`;
            }
            else if(day == -1){
                if (tmp == d){
                  list = list + `<li><a href="/${filelist[i].day}/${filelist[i].area}/${filelist[i].id}">${filelist[i].area}</a></li>`;
                }
                else {
                  list = list + `</ul>`
                  list = `<h2>` + tmp + `일차</h2>` + list;
                  tmp_list.push(list);
                  list = `<ul>`;
                  tmp++;
                  i--;
                }
            }
        }
        
        if(day == -1){
          list = list + '</ul>';
          list = `<h2>` + tmp + `일차</h2>` + list;
          console.log(typeof(tmp_list));
          for(var j = tmp_list.length-1; j >= 0; j--){
            // console.log(-1);
            // console.log(tmp_list[j]);
            list = tmp_list[j] + list;
          }
          // console.log(tmp_list);
          // console.log(list);
        }
        else{
          list = list+'</ul>';
          list = `<h2>` + day + `일차</h2>` + list;
        }
        return list;
    }
    ,create:function(){
      return `
      <!DOCTYPE html> <html lang="ko"> 
      <head> 
          <meta charset="utf-8"> 
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
          <meta name="viewport" content="width=device-width, initial-scale=1">  
          <script src="http://localhost:3000/js/jquery-3.1.1.min.js"></script> 
          <script src="http://localhost:3000/js/bootstrap.min.js"></script> 
          <link rel="stylesheet" type="text/css" href="http://localhost:3000/css/style.css">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap-theme.min.css"> 
      </head> 
      <body> 
      <h2> 게시글 작성 </h2>
      <form action="/create_process" method="post">
          <div class="form-group">
          <input type="text" class="form-control" name="id" placeholder="ID" />
          </div>
          
          
          <div class="form-group">
          <input type="text" class="form-control" name="day" placeholder="Day"/>
          </div>
          
          
          <div class="form-group input-group">
          <input type="text" class="form-control" name="area" placeholder="Area"/>
          
          <input type="text" class="form-control" name="lng" placeholder="lng"/>
          
          <input type="text" class="form-control" name="lat" placeholder="lat"/>
          </div>
          
          
          <div class="form-group">
          <input type="text" class="form-control" name="category" placeholder="Category"/>
          </div>

          <div class="form-group">
          <input type="text" class="form-control" name="description" placeholder="Description"/>
          </div>
          
          <div class="form-group">
              <input type="submit" class="btn btn-primary" value="작성 완료">
          </div>
      </form>
      </body> 
      </html>`;

    }, update:function(diary){
      return `
      <!DOCTYPE html> <html lang="ko"> 
            <head> 
                <meta charset="utf-8"> 
                <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
                <meta name="viewport" content="width=device-width, initial-scale=1">  
                <script src="http://localhost:3000/js/jquery-3.1.1.min.js"></script> 
                <script src="http://localhost:3000/js/bootstrap.min.js"></script> 
                <link rel="stylesheet" type="text/css" href="http://localhost:3000/css/style.css">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"> 
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap-theme.min.css"> 
            </head> 
            <body> 
            <h2> 게시글 수정 </h2>
            <form action="/update_process" method="post">            
                
                <div class="form-group">
                <input type="text" class="form-control" name="id" placeholder="ID" value="${diary[0].id}"/>
                </div>
                
                <div class="form-group">
                <input type="text" class="form-control" name="day" placeholder="Day" value="${diary[0].day}"/>
                </div>
            
            
                <div class="form-group input-group">
                <input type="text" class="form-control" name="area" placeholder="Area" value="${diary[0].area}"/>
                
                <input type="text" class="form-control" name="lng" placeholder="lng" value="${diary[0].lng}"/>
                
                <input type="text" class="form-control" name="lat" placeholder="lat" value="${diary[0].lat}"/>
                </div>
                
                
                <div class="form-group">
                <input type="text" class="form-control" name="category" placeholder="Category" value="${diary[0].category}"/>
                </div>
    
                <div class="form-group">
                <input type="text" class="form-control" name="description" placeholder="Description" value="${diary[0].description}"/>
                </div>
                
                <div class="form-group">
                    <input type="submit" class="btn btn-primary" value="수정 완료">
                </div>
            </form>
            </body> 
            </html>`;
    }
  }
  
