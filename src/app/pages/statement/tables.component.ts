import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import {deletestatement} from "../../../assets/js/deletestatement.js";
@Component({
 selector: "app-tables",
 templateUrl: "tables.component.html" 
})

export class TablesComponent implements OnInit{
  constructor() {}

  deleteStatement() {
  alert("this is delete statement")
  }

  /*      $("#deletebtn").click(function(){
$("#popUpMsg").text("are you sure you want to delete "+companyName+" statement");
});

$("#popUpBtn").click(function(){
$(".cover-spin").show();
 let deleteInput = {
        "async": true,
        "crossDomain": true,
        "url": "http://34.67.197.111:8000/deletestatement?companyname="+companyName,
        "method": "GET",
        "headers": {
            "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
        },
        "processData": false,
    }
 $.ajax(deleteInput).done(function (response){
window.location.href = "/#/statement";
});
});

function goToStatement(){
                        window.location.href = "/#/statement";
                }
		*/



  ngOnInit() {

  $(".deleteStatement").click(function(){  console.log($($($(this).parent()).parent()).find("td:eq(1)").text()) });





$(".cover-spin").show();
	
 function GTF(companyName){
 alert();
 window.location.href="http://34.67.197.111/#/FinancialModel?companyname="+companyName+"&scenario=1";
 location.reload();
 }

    $.ajax({


      "async": true,
        "crossDomain": true,
          "url": "http://34.67.197.111:8000/statements",
            "method": "GET",
          "headers": {
                  "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
                      "content-type": "application/json",
                      "cache-control": "no-cache",
                          "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
                            },
            "processData": false,
    
        success: function (data) {
		$(".cover-spin").hide();
        var resData = JSON.parse(data);
        var index;
        var htmlTable = '';
        
        /*statements = [{id:439,company:"Nike-1",period:"Y",username:"user",created_at:"16-10-2019 05:57",filename:"2.Public.Fitbit.pdf"},
        {"id":449,company:"Nike-1",period:"Y",username:"user",created_at:"16-10-2019 05:57",filename:"2.Public.Fitbit.pdf"}
	];*/

	let industry_arr=["Communications","Consumer & Retail","Distribution & Logistics","Energy & Natural Resources","Entertainment & Media","Financial Institutions & Sponsors","Food & Beverage","General Services","Healthcare","Hospitality","Industrials","Power, Infrastructure & Utilities","Real Estate","Technology","Telecommunications","Transportation"];

    
        for (index = 0; index < resData.length; index++) {
            var obj=resData;
			let actualName = encodeURI(obj[index].company);			
			$("#dtBasicExample tr:last").after('<tr style="color:black" id="'+obj[index].companyname+'"><td> '+ obj[index].uid + '</td> <td style="color:black;text-align:left">'+'<a href="#/FinancialModel?companyname='+ obj[index].companyname +'##&scenario=1&actualName='+actualName+'"  onclick="GTF('+obj[index].companyname+')" style="color:black a:hover{text-decoration: underline; color:#164a5b; } text-align:left;width:50px">'+ obj[index].companyname +'</a>' + '</td> <td style="text-align:left;width:50pxx"> '+ obj[index].company  + '</td> <td style="text-align:left;width:50px"> '+ industry_arr[obj[index].industry]  +' </td> <td style="text-align:left"> '+ obj[index].createdon + '</td><td style="text-align:left">' +obj[index].createdby+'</td> <td style="color:black;text-align:left"><a href="http://34.67.197.111:8000/download_file?companyname='+ obj[index].companyname +'&filename='+ obj[index].filename+'"  onclick="GTF('+obj[index].filename+')" style="color:black a:hover{text-decoration: underline; color:#164a5b; } text-align:left"><i class="fa fa-download" aria-hidden="true" style="color:black"></i></a></td>   <td><i class="fas fa-trash deleteStatement" data-toggle="modal" data-target="#popUpModal" style="cursor: pointer;" name="'+obj[index].companyname+'" (click)="deleteStatement()"></i></td> </tr>');
        }

	$(".deleteStatement").click(function(){
                  
	var companyNameToDelete =  $($($(this).parent()).parent()).find("td:eq(1)").text();
	//$("#popUpModal").modal("show");
	$("#popUpMsg").text("Are you sure want to delete "+companyNameToDelete+"?");
	$("#hiddenTxt").val(companyNameToDelete);
	

	});
 	 $("#popUpBtn").click(function(){
	 $(".cover-spin").show();
	 let name = $("#hiddenTxt").val();

        let deleteInput = {
         "async": true,
	 "crossDomain": true,
	 "url": "http://34.67.197.111:8000/deletestatement?companyname="+name,
	 "method": "GET",
	 "headers": {
	       "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
		"content-type": "application/json",
		"cache-control": "no-cache",
		"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
			},
		"processData": false,
		} 
		$.ajax(deleteInput).done(function (response){
		var deleteobj = jQuery.parseJSON(response);
		if(deleteobj.message=="Success"){
		$("#"+name).remove();
		}
		
		 $(".cover-spin").hide();
		 });

	 });
 
         

                                      }

        });  



}
}
  
