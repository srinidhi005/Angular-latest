
import { Component, OnInit } from '@angular/core';

@Component({
 selector: "app-tables",
 templateUrl: "tables.component.html"

 
})

export class TablesComponent implements OnInit{
 
  constructor() {}

  ngOnInit() {

	
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
        var resData = JSON.parse(data);
        var index;
        var htmlTable = '';
        
        /*statements = [{id:439,company:"Nike-1",period:"Y",username:"user",created_at:"16-10-2019 05:57",filename:"2.Public.Fitbit.pdf"},
        {"id":449,company:"Nike-1",period:"Y",username:"user",created_at:"16-10-2019 05:57",filename:"2.Public.Fitbit.pdf"}
        ];*/
    
        for (index = 0; index < resData.length; index++) {
            var obj=resData;
	    $("#dtBasicExample tr:last").after('<tr style="color:black"><td> '+ obj[index].id + '</td> <td style="color:black">'+'<a href="#/FinancialModel?companyname='+ obj[index].company +'##&scenario=1"  onclick="GTF('+obj[index].company+')" style="color:black;">'+ obj[index].company +'</a>' + '</td> <td> '+ obj[index].period  + '</td> <td> '+ obj[index].username  +' </td> <td> '+ obj[index].created_at  +' </td><td> '+ obj[index].filename  + '</td>  </tr>');
        }
         
                                      }
        });

  }
  
}
