import { Component, OnInit } from "@angular/core";
import "../../../assets/js/profile.js";


@Component({
  selector: "app-user",
  templateUrl: "profile.component.html",
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

userName: string = "";
firstName: string = "";
lastName: string = "";
email: string = "";
confirmPassword: string = "";
contactNumber: string = "";
companyName: string = "";
companyTitle: string = "";
companyAddress: string = "";
companyCity: string = "";
companyState: string = "";
companyCountry: string = "";
companyZipCode: string = "";
industry: string = "";
geography: string = "";
companySize: string = "";
capatialization: string = "";
revenue: string = "";
password : string = "";
emailValidation : string = "";


/*
*/
//userName: ['', Validators.pattern('^[a-zA-Z \-\']+')];
/*
allowAlphaOnly(e) {
	var code = ('charCode' in e) ? e.charCode : e.keyCode;
    if (!(code > 64 && code < 91) && // upper alpha (A-Z)
                !(code > 96 && code < 123)) { // lower alpha (a-z)
        e.preventDefault();
    }
}
*/
onSave($event){
	if(this.userName == "" || this.firstName == "" || this.lastName == "" || this.email == "" || this.password == "" || this.confirmPassword == ""){
		this.userName = "chandu";
		//validateEmail("chandu");
		alert(123);
	}else{
		alert(12356);
	}
}

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

//$(".iti__selected-dial-code").html()