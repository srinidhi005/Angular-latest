function upload(ev){
    ev.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
          var data= JSON.stringify({username, password});
    var data = {username: username,password: password};
               $.post('/login', data, function(data, status) {
                    if (data.status == 'SUCCESS') {
                         window.location = '#/statement';
                    }
                })
   
            return false;
    }
