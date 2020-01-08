import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user",
  templateUrl: "profile.component.html",
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  
    jQuery( document ).ready( function( $ ) {   
      if(jQuery('#telnumber-field').length){
          var input = document.querySelector("#telnumber-field");
         (<any>window).intlTelInput(input, {
              preferredCountries: ['in'],
              separateDialCode: true
          });
      }       
  
  });
  
  }
}