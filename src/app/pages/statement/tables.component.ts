
import { Component, OnInit } from '@angular/core';

@Component({
 selector: "app-tables",
 templateUrl: "tables.component.html"

 
})

export class TablesComponent implements OnInit{
 
  constructor() {}

  ngOnInit() {
$(".cover-spin").show();
	
 function GTF(companyName){
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
	    $("#dtBasicExample tr:last").after('<tr style="color:black" ><td> '+ obj[index].uid + '</td> <td style="color:black;text-align:left">'+'<a href="#/FinancialModel?companyname='+ obj[index].companyname +'##&scenario=1"  onclick="GTF('+obj[index].companyname+')" style="color:black a:hover{text-decoration: underline; color:#164a5b; } text-align:left">'+ obj[index].companyname +'</a>' + '</td> <td style="text-align:left"> '+ obj[index].company  + '</td> <td style="text-align:left"> '+ industry_arr[obj[index].industry]  +' </td> <td style="text-align:left"> '+ obj[index].filename  +' </td><td style="text-align:left"> '+ obj[index].createdon + '</td><td style="text-align:left">'+obj[index].createdby+'</td>  </tr>');
        }
         
                                      }
        });

  }
  
}
