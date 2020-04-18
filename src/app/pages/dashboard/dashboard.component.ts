import * as $ from 'jquery';
import "../../../assets/js/High.js";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import * as  Highcharts1 from 'highcharts';
import * as  Highcharts from 'highcharts';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

    @ViewChild("totalRevenue", { read: ElementRef,static:true }) totalRevenue: ElementRef;
    @ViewChild("grossProfit", { read: ElementRef,static:true }) grossProfit: ElementRef;
    @ViewChild("netIncome", { read: ElementRef,static:true }) netIncome: ElementRef;
    @ViewChild("ebitda", { read: ElementRef,static:true }) ebitda: ElementRef;
    @ViewChild("ebit", { read: ElementRef,static:true }) ebit: ElementRef;
    @ViewChild("ebt", { read: ElementRef,static:true }) ebt: ElementRef;
 

  constructor() {}

  ngOnInit() {

    var yearsArray = [];
    var companyName = "";
    
    try {
	   companyName = window.location.href.split("=")[1];
    }catch (error) {
	   console.log(error);
	}
    if(companyName  ==  undefined){
        alert("Please select company which is contrain atleast one scenario.");
    }
    
    //var companyName = "Nike14032020123";
    var actualObj = new Map();
    var previousAmount = 0;
    var revenueArray= [];
    var grossprofitArray= [];
    var netincomeArray= [];
    var ebitdaArray = [];
    var ebitArray = [];
    var ebtArray = [];
    
    ///-----------------------------------------------------
    
  let scenarioInput = {
        "async": true,
        "crossDomain": true,
        "url": "http://34.67.197.111:8000/scenarios?company="+companyName,
        "method": "GET",
        "headers": {
            "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
        },
        "processData": false,
	}
    $(".cover-spin").show();
	$.ajax(scenarioInput).done(function (response){
    $(".cover-spin").hide();
      let str="";
	  let presentScenarios = [];
	  presentScenarios = (JSON.parse(response)).scenarios;
	  for(var i=1;i<presentScenarios.length;i++){
		  str=str+"<option _ngcontent-sut-c5='' value='"+presentScenarios[i]+"' ng-reflect-value='"+presentScenarios[i]+"'> Scenario "+presentScenarios[i]+" </option>";
      }
    	  $("#sel2").html(str);
    });
  
    
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
			   });
               
    function loaddata(scenario){
    	let projectionsInput = {
            "async": true,
            "crossDomain": true,
            "url": "http://34.67.197.111:8000/projections?company="+companyName+"&scenario="+scenario,
            "method": "GET",
            "headers": {
                "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
            },
            "processData": true,
        }

        $(".cover-spin").show();
        $.ajax(projectionsInput).done(function (response){
        $(".cover-spin").hide();
            let resObject = JSON.parse(response);
            yearsArray = [];
            for (let j=0; j<resObject.length; j++) {
                
                yearsArray.push(resObject[j].asof);
                revenueArray.push(resObject[j].totalrevenue);
                grossprofitArray.push(resObject[j].grossprofit);
                netincomeArray.push(resObject[j].netincome);
                ebitdaArray.push(resObject[j].ebitda);
                ebitArray.push(resObject[j].ebit);
                ebtArray.push(resObject[j].ebt);
                
            }
            
            loadDataGraph();
        });
        
        }
    
    let obj:any = {};
    //-----------------------------------
    
     var totalRevenueChart =  (Highcharts1 as any).chart(this.totalRevenue.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: ''
        },
    
        xAxis: {
             categories: yearsArray,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
            
        },
        colors: [	
            'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        series: [{
        name: 'Actual',
        data: []

    }, {
        name: 'Projection',
        data: []

    }, {
        name: 'Variance',
        data: []

    }
        ]
       
      });

    
    var grossProfitChart =  (Highcharts1 as any).chart(this.grossProfit.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: ''
        },
    
        xAxis: {
             categories: yearsArray,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
            
        },
        colors: [	
            'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        series: [{
        name: 'Actual',
        data: []

    }, {
        name: 'Projection',
        data: []

    }, {
        name: 'Variance',
        data: []

    }
        ]
       
      });


var netIncomeChart =  (Highcharts1 as any).chart(this.netIncome.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: ''
        },
    
        xAxis: {
             categories: yearsArray,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
            
        },
        colors: [	
            'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
        name: 'Actual',
        data: []

    }, {
        name: 'Projection',
        data: []

    }, {
        name: 'Variance',
        data: []

    }
        ]
       
      });


var ebitdaChart =  (Highcharts1 as any).chart(this.ebitda.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: ''
        },
    
        xAxis: {
             categories: yearsArray,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
            
        },
        colors: [	
            'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
        name: 'Actual',
        data: []

    }, {
        name: 'Projection',
        data: []

    }, {
        name: 'Variance',
        data: []

    }
        ]
       
      });

 var ebitChart =  (Highcharts1 as any).chart(this.ebit.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: ''
        },
    
        xAxis: {
             categories: yearsArray,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
            
        },
        colors: [	
            'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
        name: 'Actual',
        data: []

    }, {
        name: 'Projection',
        data: []

    }, {
        name: 'Variance',
        data: []

    }
        ]
       
      });


var ebtChart =  (Highcharts1 as any).chart(this.ebt.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: ''
        },
    
        xAxis: {
             categories: yearsArray,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
            
        },
        colors: [	
             'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        series: [{
            name: 'Actual',
            data: []

        }, {
            name: 'Projection',
            data: []

        }, {
            name: 'Variance',
            data: []

        }]
       
      });
      Highcharts.setOptions({lang: {thousandsSep: ','}});
      
      //setTimeout(function(){ 
    //     loadDataGraph();
      //  }, 2000);
        
      function loadDataGraph(){
            $(".cover-spin").show();
            totalRevenueChart.series[1].update({data:revenueArray});
            totalRevenueChart.xAxis[0].setCategories(yearsArray);
            grossProfitChart.series[1].update({data:grossprofitArray});
            grossProfitChart.xAxis[0].setCategories(yearsArray);
            netIncomeChart.series[1].update({data:netincomeArray});
            netIncomeChart.xAxis[0].setCategories(yearsArray);
            ebitdaChart.series[1].update({data:ebitdaArray});
            ebitdaChart.xAxis[0].setCategories(yearsArray);
            ebitChart.series[1].update({data:ebitArray});
            ebitChart.xAxis[0].setCategories(yearsArray);
            ebtChart.series[1].update({data:ebtArray});
            ebtChart.xAxis[0].setCategories(yearsArray);
            
            updateTable("#RevenueProjection",revenueArray);
            updateTable("#GrossProfitProjection",grossprofitArray);
            updateTable("#NetIncomeProjection",netincomeArray);
            updateTable("#EBITDAProjection",ebitdaArray);
            updateTable("#EBITProjection",ebitArray);
            updateTable("#EBTProjection",ebtArray);
       
            let txt = "<th scope='col'></th>";
            for(let i=0;i<yearsArray.length;i++){
                txt = txt + "<th scope='col' style='text-align: center;'>"+yearsArray[i] +"</th>";
            }
            $("#tableHeading,#tableHeading2,#tableHeading3,#tableHeading4,#tableHeading5,#tableHeading6").html(txt);
            $(".cover-spin").hide();
      
      }
        
      
      function updateTable(ida,data){
         let trText = "<th scope='row' style='color:skyblue;border: none;'>Projections</th>";
            for(let i=0;i<data.length;i++){
                trText  = trText +  "<td>"+formatter.format(data[i])+"</td>";
            }
      
         $(ida).html(trText);
      }
      
      
            $( "#sel2" ).change(function () {  
                let scenario = $("#sel2").val();
                if($("#sel2").val() == undefined){
                    scenario = 1;
                }
                loaddata(scenario);
            });
            loaddata(1);
            
    }
}
