import * as $ from 'jquery';
import "../../../assets/js/High.js";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import * as  Highcharts1 from 'highcharts';
import * as  Highcharts from 'highcharts';
import * as draggablePoints from 'highcharts-draggable-points/draggable-points.js';
@Component({
  selector: "app-map",
  templateUrl: "map.component.html",
})
export class MapComponent implements OnInit {

    @ViewChild("totalRevenue", { read: ElementRef,static:true }) totalRevenue: ElementRef;
    @ViewChild("grossProfit", { read: ElementRef,static:true }) grossProfit: ElementRef;
    @ViewChild("netIncome", { read: ElementRef,static:true }) netIncome: ElementRef;
    @ViewChild("ebitda", { read: ElementRef,static:true }) ebitda: ElementRef;
    @ViewChild("ebit", { read: ElementRef,static:true }) ebit: ElementRef;
    @ViewChild("ebt", { read: ElementRef,static:true }) ebt: ElementRef;
 

  constructor() {}

  ngOnInit() {
 	draggablePoints(Highcharts1);
    var yearsArray = [];
	var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var dataForAll = [];//[20,30,50,60,40,80,90,70,20,30,50,60];
    var companyName = "";
    
    try {
	   companyName = window.location.href.split("=")[1];
    }catch (error) {
	   console.log(error);
	}
    if(companyName  ==  undefined){
       // For demo alert("Please select company which is contrain atleast one scenario.");
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
	//var actualObj;
    
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
			actualObj = new Map();
			let yearOption = "";
            for (let j=0; j<resObject.length; j++) {
                
                yearsArray.push(resObject[j].asof);
                //revenueArray.push(resObject[j].totalrevenue);
                //grossprofitArray.push(resObject[j].grossprofit);
                //netincomeArray.push(resObject[j].netincome);
                //ebitdaArray.push(resObject[j].ebitda);
                //ebitArray.push(resObject[j].ebit);
                //ebtArray.push(resObject[j].ebt);
                
				//for dropdown				
				yearOption = yearOption + "<option _ngcontent-sut-c5='' value='"+resObject[j].asof+"' ng-reflect-value = '"+resObject[j].asof+"'>"+resObject[j].asof+"</option>";
				
				actualObj.set(resObject[j].asof,{
					"totalRevenue":resObject[j].totalrevenue,
					"p_GrossProfit" : resObject[j].grossprofit, 
					"p_EBIT" : resObject[j].ebit, 
					"p_EBITDA" : resObject[j].ebitda, 
					"p_EBT" : resObject[j].ebt,
					"p_NetInCome" : resObject[j].netincome,
					"latest" : resObject[j].latest
					});
				
            }
            $("#sel1").html(yearOption);
				
            loadDataGraph(yearsArray[0]);
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
             categories: monthNames,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'Percentage'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                           
						   console.log(e.y,e.target.category,e.x);
						   
                        }
                    }
                },
                stickyTracking: true
            },
            column: {
                stacking: 'normal',
                color:'grey'
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 1,
            valueSuffix:"%"
    
        },
        series: [{
        name: 'Projuction',
        data: dataForAll,
		 draggableY: true,
		// draggableX: false,
            dragMinY: 0,
            dragMaxY: 100,
            type: "column",
            minPointLength: 2,
            showInLegend: false

    }]
       
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
             categories: monthNames,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'Percentage'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                            //updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: true
            },
            column: {
                stacking: 'normal',
                color:'grey'
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 1,
            valueSuffix:"%"
    
        },
        series: [{
        name: 'Projuction',
        data: dataForAll,
		 draggableY: true,
            dragMinY: -100,
            dragMaxY: 100,
            type: "column",
            minPointLength: 2,
            showInLegend: false

    }]
       
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
             categories: monthNames,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'Percentage'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                           // updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: true
            },
            column: {
                stacking: 'normal',
                color:'grey'
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 1,
            valueSuffix:"%"
    
        },
         series: [{
        name: 'Projuction',
        data: dataForAll,
		 draggableY: true,
            dragMinY: -100,
            dragMaxY: 100,
            type: "column",
            minPointLength: 2,
            showInLegend: false

    }]
       
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
             categories: monthNames,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'Percentage'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                           // updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: true
            },
            column: {
                stacking: 'normal',
                color:'grey'
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 1,
            valueSuffix:"%"
    
        },
         series: [{
        name: 'Projuction',
        data: dataForAll,
		 draggableY: true,
            dragMinY: -100,
            dragMaxY: 100,
            type: "column",
            minPointLength: 2,
            showInLegend: false

    }]
       
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
             categories: monthNames,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'Percentage'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                           // updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: true
            },
            column: {
                stacking: 'normal',
                color:'grey'
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 1,
            valueSuffix:"%"
    
        },
         series: [{
        name: 'Projuction',
        data: dataForAll,
		 draggableY: true,
            dragMinY: -100,
            dragMaxY: 100,
            type: "column",
            minPointLength: 2,
            showInLegend: false

    }]
       
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
             categories: monthNames,
            crosshair: true
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'Percentage'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                           // updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: true
            },
            column: {
                stacking: 'normal',
                color:'grey'
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
             'skyblue','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 1,
            valueSuffix:"%"
    
        },
         series: [{
        name: 'Projuction',
        data: dataForAll,
		 draggableY: true,
            dragMinY: -100,
            dragMaxY: 100,
            type: "column",
            minPointLength: 2,
            showInLegend: false

    }]
       
      });
      Highcharts.setOptions({lang: {thousandsSep: ','}});
      
      //setTimeout(function(){ 
    //     loadDataGraph();
      //  }, 2000);
        
      function loadDataGraph(year){
            $(".cover-spin").show();
			
			for(let i=0;i<12;i++){
				revenueArray[i] = (100/12); //(actualObj.get(year).totalRevenue)/10;
				grossprofitArray[i] = (100/12); // (actualObj.get(year).p_GrossProfit)/10;
				netincomeArray[i] = (100/12); //(actualObj.get(year).p_EBIT)/10;
				ebitdaArray[i] = (100/12); //(actualObj.get(year).p_EBITDA)/10;
				ebitArray[i] = (100/12); //(actualObj.get(year).p_EBT)/10;
				ebtArray[i] = (100/12); //(actualObj.get(year).p_NetInCome)/10;
			}
			totalRevenueChart.series[0].update({data:revenueArray});
            grossProfitChart.series[0].update({data:grossprofitArray});
            netIncomeChart.series[0].update({data:netincomeArray});
            ebitdaChart.series[0].update({data:ebitdaArray});
            ebitChart.series[0].update({data:ebitArray});
            ebtChart.series[0].update({data:ebtArray});
            
            $(".cover-spin").hide();
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

   
