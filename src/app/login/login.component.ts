import { Component, OnInit } from '@angular/core';
import "../../assets/js/login.js";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  // function upload(ev){
  //  ev.preventDefault();
  //  var username = document.getElementById("username").value;
  //  var password = document.getElementById("password").value;
  //        var data= JSON.stringify({username, password});
  //  console.log(`username is ${username} password is ${password}`);
  //  var data = {username: username,password: password};
  //             $.post('/login', data, function(data, status) {
  //                  if (data.status == 'SUCCESS') {
  //                      window.location = '/index';
  //                  }
  //              })
  //  
  //          return false;
  //  }
      
      
  }

}
