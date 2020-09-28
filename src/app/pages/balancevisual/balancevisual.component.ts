import * as $ from 'jquery';
import "../../../assets/js/balancevisual.js";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import * as  Highcharts1 from 'highcharts';
import * as  Highcharts from 'highcharts';

import * as draggablePoints from 'highcharts-draggable-points/draggable-points.js';
@Component({
    selector: "app-balancevisual",
    templateUrl: "./balancevisual.component.html"
    
  })


 export class BalancevisualComponent implements OnInit {
   
     @ViewChild("revenuegrowth",{ read: ElementRef,static:true }) container: ElementRef;
     @ViewChild("cogs", { read: ElementRef,static:true }) containe: ElementRef;
     @ViewChild("SG&A", { read: ElementRef,static:true }) contain: ElementRef;
     @ViewChild("D&A", { read: ElementRef,static:true }) contai: ElementRef;
     @ViewChild("otheincome", { read: ElementRef,static:true }) conta: ElementRef;
     @ViewChild("netie", { read: ElementRef,static:true }) cont: ElementRef;
     @ViewChild("projectionOne", { read: ElementRef,static:true }) con: ElementRef;
     @ViewChild("projectionTwo", { read: ElementRef,static:true }) co: ElementRef;
     @ViewChild("projectionThree", { read: ElementRef,static:true }) cnn: ElementRef;
     @ViewChild("projectionFour", { read: ElementRef,static:true }) cer: ElementRef;
     @ViewChild("projectionFive", { read: ElementRef,static:true }) cpt: ElementRef;
     @ViewChild("projectionSix", { read: ElementRef,static:true }) crs: ElementRef;

    constructor() {
    }
    
    ngOnInit() {
	$("#addNewScenario").hide();
	$(".cover-spin").show();
        draggablePoints(Highcharts1);
	var yearsArray = [];
	var yearsArrayForAssum = [];
	var nextScenarioNo;
        var companyName; 
        var scenarioNumber;
        var scenarioCount;
        var assumptionArray = [];
        var actualObj;
        var previousAmount=0;
var inputArray= [];
        function fun1(){
             yearsArray = [];
			 yearsArrayForAssum = [];
             inputArray= [];
try {
	var queryString = window.location.href.split("?")[1];
	 companyName = (queryString.split("&")[0]).split("=")[1];
	 scenarioNumber = (queryString.split("&")[1]).split("=")[1];
	 //	 $("#sel2").val(scenarioNumber);
	 if(companyName.endsWith("##")){
	 window.location.href=(((decodeURI(window.location.href)).split("=")[0])+"="+(companyName.substring(0,companyName.length-2))+"&scenario="+scenarioNumber);
	
			window.location.reload();
			  }else{
			  $(".cover-spin").hide();
			  }
	 } catch (error) {
	 $(".cover-spin").hide();
	console.log(error);
}
  scenarioCount = 0;
//   $("#navcompany").show();
// $("#navcompany").text("  :companyName: " + companyName + ");
$("#excelId").attr("href","/pdf?companyName="+companyName);
$("#dashBoardId").attr("href","#/dashboard?companyName="+companyName);
$("#actualsId").attr("href","/actual?CompanyName="+companyName);
$("#financialId").attr("href","/FinancialModel?CompanyName="+companyName);
$("#metricsbtn").attr("href","#/pdf?CompanyName="+companyName+"##");
$("#balanceId").attr("href","/balance-actuals?companName="+companyName);

 assumptionArray = [];
let actualsInput = {
	"async": true,
	"crossDomain": true,
	"url": "http://34.67.197.111:8000/balance-actuals?company="+companyName,
	"method": "GET",
	"headers": {
		"authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
		"content-type": "application/json",
		"cache-control": "no-cache",
		"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
	},
	"processData": false,
}
	 actualObj = new Map();
 
    var obj=[];
	 previousAmount = 0;
	$('#cover-spin').show();
	$.ajax(actualsInput).done(function (response){
	$('#cover-spin').hide();
			let resObject = JSON.parse(response);
			//let resObject = JSON.parse((JSON.parse(response)).result);
			for (let j=0; j<resObject.length; j++) {
				if( resObject[j].latest === 0){
					previousAmount = resObject[j].cashequivalents;
				}
				actualObj.set(resObject[j].asof,{
							"cashequivalents": resObject[j].cashequivalents ,
									"accountsreceivable" : resObject[j].accountsreceivable, 
									"inventories" : resObject[j].inventories, 
									"ppe" : resObject[j].ppe, 
									"intangibleassets" : resObject[j].intangibleassets,
									"goodwill" : resObject[j].goodwill,
									"otherassets" :resObject[j].otherassets,
									"totalassets" : resObject[j].totalassets,
									"currentportionlongtermdebt" : resObject[j].currentportionlongtermdebt,
									"accountspayable":resObject[j].accountspayable,
	   								"accruedliabilities":resObject[j].accruedliabilities,
	    							"othercurrentliabilities":resObject[j].othercurrentliabilities,
	    							"totalcurrentliabilities":resObject[j].totalcurrentliabilities,
									"longtermdebt":resObject[j].longtermdebt,
									"otherliabilities" : resObject[j].otherliabilities,
									"totalliabilities" : resObject[j].totalliabilities,
									"totalshareholdersequity" : resObject[j].totalshareholdersequity,
									"totalliabilitiesandequity" : resObject[j].totalliabilitiesandequity,
									"memocheck " : resObject[j].memocheck ,
									"totalrevenue" : resObject[j].totalrevenue,
									"cogs" : resObject[j].cogs,
									"dso" : resObject[j].dso,
									"inventorydays" : resObject[j].inventorydays,
									"othercurrentassetspercent" : resObject[j].othercurrentassetspercent,
									"dpo" : resObject[j].dpo,
									"accruedliabilitiespercent" : resObject[j].accruedliabilitiespercent,
									"othercurrentliabilitiespercent" : resObject[j].othercurrentliabilitiespercent
					}
				);
			yearsArray.push(resObject[j].asof);
			}
		updateProjection(actualObj);			 
	});
	}


	
        fun1();
           
	let obj:any = {};

	var revenueGrowthChart =  (Highcharts1 as any).chart(this.container.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          renderTo: 'revenuegrowth'
        },
        title: {
            text: 'Revenue'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
            yAxis: {
                min : -50,
                max : 50,
                title : {
                    text:'In Percentage %'
                }
            },
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: true
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [
            'skyblue','skyblue','grey','grey','grey','grey'],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
            name: '',
	    data : [],
	    //data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
           
            draggableY: true,
            dragMinY: -100,
            dragMaxY: 100,
            type: "column",
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });


     var COGSChart =  (Highcharts1 as any).chart(this.containe.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: 'COGS'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'As % of Revenue'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            updatedCOGSChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [
            'skyblue','skyblue','grey','grey','grey','grey'],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
            name: '',
	    data : [],
	    // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: true,
            dragMinY: -50,
            dragMaxY: 100,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });
    
      var SGAndAChart=(Highcharts1 as any).chart(this.contain.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
            text: 'Days Sales Outstanding (DSO)'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
			crosshair:true,
			
			title : {
				text:'As % of Revenue'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            updatedSGAndAChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            'skyblue','skyblue','grey','grey','grey','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
            name: '',
	     data : [],
	     // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: true,
            dragMinY: -50,
            dragMaxY: 100,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

     var DAndAChart= (Highcharts1 as any).chart(this.contai.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
            text: 'Inventory Days'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
	min : -50,
	max :50,
			
			title : {
				text:'As % of Revenue'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            updatedDAndAChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            
                   'skyblue','skyblue','grey','grey','grey','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
            name: '',
	    data : [],
	    // data: [obj.get(yearsArray[0]).DAndA,obj.get(yearsArray[1]).DAndA,obj.get(yearsArray[2]).DAndA,obj.get(yearsArray[3]).DAndA],
            draggableX: false,
            draggableY: true,
            dragMinY: -50,
            dragMaxY: 100,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

    var otherIncomeOrExpenseChart=    (Highcharts1 as any).chart(this.conta.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
            text: 'Other Current Assets (as % of Revenue)'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
			min : -20,
			max : 20,
			title : {
				text:'As % of Revenue'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            updatedOtherIncomeChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
           
                   'skyblue','skyblue', 'grey', 'grey', 'grey', 'grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
            name: '',
	     data : [],
	    // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: true,
            dragMinY: -100,
            dragMaxY: 100,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });
	  
	   var otherIncomeOrExpenseChart=    (Highcharts1 as any).chart(this.conta.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
            text: 'Days Payable Outstanding (DPO)'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
			min : -20,
			max : 20,
			title : {
				text:'As % of Revenue'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            updatedOtherIncomeChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
           
                   'skyblue','skyblue', 'grey', 'grey', 'grey', 'grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
            name: '',
	     data : [],
	    // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: true,
            dragMinY: -100,
            dragMaxY: 100,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });
	  
	   var otherIncomeOrExpenseChart=    (Highcharts1 as any).chart(this.conta.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
            text: 'Accrued Liabilities (as % of COGS)'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
			min : -20,
			max : 20,
			title : {
				text:'As % of Revenue'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            updatedOtherIncomeChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
           
                   'skyblue','skyblue', 'grey', 'grey', 'grey', 'grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
            name: '',
	     data : [],
	    // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: true,
            dragMinY: -100,
            dragMaxY: 100,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

    var netIterestExpenseChart=  (Highcharts1 as any).chart(this.cont.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
            text: 'Other Current Liabilities (as % of COGS) '
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
		  crosshair: true,
			
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            updatenetinterestchart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            
                   'skyblue','skyblue','grey','grey','grey','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        series: [{
            name: '',
	     data : [],
	    //data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: true,
         
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

	Highcharts.setOptions({
	                lang: {
			                        thousandsSep: ','
						                }
								        });


    var p_totalRevenueChart=  (Highcharts as any).chart(this.con.nativeElement, {
        // Created pie chart using Highchart

	chart: {
          type: 'column'
         
        },
        title: {
            text: 'Total Revenue'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	
	  crosshair: true,
			
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    // events: {
    
                    //     drag: function (e) {
                    //     },
                    //     drop: function (e) {  
                    //         updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                    //     }
                    // }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
             data : [],
            // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

     var p_grossProfitChart= (Highcharts as any).chart(this.co.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
        
        },
        title: {
            text: 'Gross Profit'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	
	  crosshair: true,
			
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                            updatedCOGSChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
             data : [],
            // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

     var p_EBITChart= (Highcharts as any).chart(this.cnn.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
        
        },
        title: {
            text: 'EBIT'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	
	  crosshair: true,
		
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                            updatedSGAndAChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
              
            },
            line: {
                cursor: 'ns-resize'
            }
        },
      
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
	     data : [],
	     //data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
	   
	     draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

    var p_EBITDAChart=  (Highcharts as any).chart(this.cer.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: 'EBITDA'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	  crosshair: true,
		
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                            updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
                
            },
            line: {
                cursor: 'ns-resize'
            }
        },
       
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
             data : [],
            // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

      var p_EBTChart=(Highcharts as any).chart(this.cpt.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: 'EBT'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	
	  crosshair: true,
			
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                            updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
       
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
             data : [],
            // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

    var p_NetInComeArrayChart=  (Highcharts as any).chart(this.crs.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: 'Net Income'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	
	  crosshair: true,
			
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                            updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
            data:[],
            //  data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

      Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: 'Poppins'
            }
        }
    });
   
      
      $("#deletebtn").click(function(){
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

function loadData(){
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
    let assumptionInput = {
        "async": true,
        "crossDomain": true,
        "url": "http://34.67.197.111:8000/projections?company="+companyName+"&scenario=0",
        "method": "GET",
        "headers": {
            "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
        },
        "processData": false,
    }
    $('#cover-spin').show();
    $.ajax(scenarioInput).done(function (response){
    $('#cover-spin').hide();
        let presentScenarios = [];
        presentScenarios = (JSON.parse(response)).scenarios;
        //presentScenarios = JSON.parse(((JSON.parse(response)).result)).scenarios;
            
        console.log("1:",presentScenarios);
        console.log("2:",scenarioNumber);
        //presentScenarios = [0];
        if(presentScenarios.includes(parseInt(scenarioNumber))){
            assumptionInput.url = "http://34.67.197.111:8000/projections?company="+companyName+"&scenario="+scenarioNumber;

        }
        for(let index = 1;index <= presentScenarios.length ; index++){
            console.log("3:typeof presentScenarios[index] ",typeof presentScenarios[index] );
            if(typeof presentScenarios[index] != 'undefined'){
                scenarioCount = index + 1;
                $("#scenario"+presentScenarios[index]).show();
		$("#scenarioa"+presentScenarios[index]).attr("href","#/FinancialModel?companyName="+companyName+"&senario="+presentScenarios[index]);

            }else if(index == 1){
                // scenarioCount = index;
                $("#addNewScenario").hide();

            }
        }
        console.log("4:scenarioCount",scenarioCount);
        if(scenarioCount <= 4 && scenarioCount > 0){
            //  scenarioNumber = parseInt(scenarioCount);
            console.log("scenarioCount",scenarioCount);
	    $("#addNewScenario").show();
	    nextScenarioNo=scenarioCount;
            $("#addNewScenario").attr("href","#/FinancialModel?companyName="+companyName+"&senario="+(scenarioCount));
        }else{
            $("#addNewScenario").hide();
        }
        if(parseInt(scenarioNumber) <= 4 && parseInt(scenarioNumber) >= 0){
        	$("#saveScenario").show();
        }
        $('#cover-spin').show();
        $.ajax(assumptionInput).done(function (response){
        $('#cover-spin').hide();
            let resObject = JSON.parse(response);
            if(Array.isArray(resObject)){
                let totalRevenue = 0;
                let revenueGrowthArray = [];
                let COGSArray = [];
                let SGAndAArray = [];
                let DAndAArray = [];
                let otherIncomeOrExpenseArray = [];
                let netinterestdollarsArray = [];
                for (let j=0; j<resObject.length; j++) {
                    if(j == 0){
                        totalRevenue = Math.round(previousAmount + (previousAmount * (resObject[j].revenuepercent/100)));
                    }else{
                        totalRevenue = Math.round(resObject[j-1].totalRevenue + (resObject[j-1].totalRevenue * (resObject[j].revenuepercent/100)));
                    }
                    actualObj.set(resObject[j].asof,{
                            "totalRevenue": totalRevenue,
                            "revenueGrowth" : resObject[j].revenuepercent, 
                            "COGS" : resObject[j].cogspercent, 
                            "SGAndA" : resObject[j].sgapercent, 
                            "DAndA" : resObject[j].dapercent,
                            "netIterestExpense" : resObject[j].netinterestdollars,
                            "otherIncomeOrExpense" :resObject[j].otherincomepercent,
                            "netinterest" : resObject[j].netinterest,
                            "latest" : resObject[j].latest,
                            "taxes" :resObject[j].taxespercent,
							// "latest" : resObject[j].latest
							
							"revenuepercent" : resObject[j].revenuepercent,
							"sgapercent" : resObject[j].sgapercent,
							"cogspercent" : resObject[j].cogspercent,
							"dapercent" : resObject[j].dapercent
                            
                    });
                    yearsArray.push(resObject[j].asof);
                    assumptionArray.push(resObject[j].asof);
                    //revenueGrowthArray.push(resObject[j].revenuepercent);
                    //COGSArray.push(resObject[j].cogspercent);
                    //SGAndAArray.push(resObject[j].sgapercent);
                    //DAndAArray.push(resObject[j].dapercent);
                    //otherIncomeOrExpenseArray.push(resObject[j].otherincomepercent);
                    //netinterestdollarsArray.push(resObject[j].netinterestdollars);
                }
				for(let i=1;i<yearsArray.length;i++){
				
					yearsArrayForAssum.push(yearsArray[i]);
				
				    revenueGrowthArray.push((actualObj.get(yearsArray[i]).revenuepercent == undefined)?0: actualObj.get(yearsArray[i]).revenuepercent );
					
					COGSArray.push((actualObj.get(yearsArray[i]).cogspercent == undefined)?0: actualObj.get(yearsArray[i]).cogspercent );
					
					SGAndAArray.push((actualObj.get(yearsArray[i]).sgapercent == undefined)?0: actualObj.get(yearsArray[i]).sgapercent );
					
					DAndAArray.push((actualObj.get(yearsArray[i]).revenuepercent == undefined)?0: actualObj.get(yearsArray[i]).revenuepercent );
					
					otherIncomeOrExpenseArray.push((actualObj.get(yearsArray[i]).otherincomepercent == undefined)?0: actualObj.get(yearsArray[i]).otherincomepercent );
					
					netinterestdollarsArray.push((actualObj.get(yearsArray[i]).netIterestExpense == undefined)?0: actualObj.get(yearsArray[i]).netIterestExpense );
					
                    //COGSArray.push(actualObj.get(yearsArray[i]).cogspercent);
                    //SGAndAArray.push(actualObj.get(yearsArray[i]).sgapercent);
                    //DAndAArray.push(actualObj.get(yearsArray[i]).dapercent);
                    //otherIncomeOrExpenseArray.push(actualObj.get(yearsArray[i]).otherincomepercent);
                    //netinterestdollarsArray.push(actualObj.get(yearsArray[i]).netinterestdollars);
				}
				
				revenueGrowthChart.series[0].update({data:revenueGrowthArray});
                COGSChart.series[0].update({data:COGSArray});
                SGAndAChart.series[0].update({data:SGAndAArray});
                DAndAChart.series[0].update({data:DAndAArray});
                otherIncomeOrExpenseChart.series[0].update({data:otherIncomeOrExpenseArray});
                netIterestExpenseChart.series[0].update({data:netinterestdollarsArray});
                updateProjection(actualObj);
            }			 
        });
    });
    }
    
    loadData();
    
    
    function updateP_TotalRevenueChart(x,y,index){
        console.log("xyz",x,y,index);
        actualObj.get(y).revenueGrowth = x;
        updateProjection(actualObj);
    }
    function updatedCOGSChart(x,y,index){
    console.log("Cogs",x,y,index);
        actualObj.get(y).COGS = x;
        updateProjection(actualObj);
    }
    function updatedSGAndAChart(x,y,index){
    console.log("SGa",x,y,index);
        actualObj.get(y).SGAndA = x;
        updateProjection(actualObj);
    }
    function updatedDAndAChart(x,y,index){
   console.log("Da",x,y,index);
        actualObj.get(y).DAndA = x;
        updateProjection(actualObj);
    }
    function updatedOtherIncomeChart(x,y,index){
    console.log("otherincome",x,y,index);
        actualObj.get(y).otherIncomeOrExpense = x;
        updateProjection(actualObj);
    }

			 function updatenetinterestchart(x,y,index){
			     console.log("netie",x,y,index);
			             actualObj.get(y).netIterestExpense = x;
				     updateProjection(actualObj);
				     }

    function updateProjection(obj){
	$(".cover-spin").show();

        let totalRevenueArray = [];
        let p_GrossProfitArray = [];
        let p_EBITArray = [];
        let p_EBITDAArray = [];
        let p_EBTArray = [];
        let p_NetInComeArray =[];
        //let revenueGrowthArray =[];
        let lastKey = 0;
        for (let [key, value] of obj) {
            if(typeof obj.get(key).COGS !== 'undefined'){
                obj.get(key).totalRevenue = Math.round(obj.get(lastKey).totalRevenue + (obj.get(lastKey).totalRevenue * (obj.get(key).revenueGrowth/100)));
                obj.get(key).p_COGS = Math.round(obj.get(key).totalRevenue * (obj.get(key).COGS/100));
                obj.get(key).p_GrossProfit = Math.round(obj.get(key).totalRevenue - obj.get(key).p_COGS);
                obj.get(key).p_SGAndA = Math.round(obj.get(key).totalRevenue * (obj.get(key).SGAndA/100));
                obj.get(key).p_EBIT = Math.round(obj.get(key).p_GrossProfit - obj.get(key).p_SGAndA);
                obj.get(key).p_DAndA = Math.round(obj.get(key).totalRevenue * (obj.get(key).DAndA/100));
                obj.get(key).p_EBITDA = Math.round(obj.get(key).p_EBIT + obj.get(key).p_DAndA);
                obj.get(key).p_NIE = obj.get(key).netIterestExpense;
                obj.get(key).p_OIOrE = Math.round(obj.get(key).totalRevenue * (obj.get(key).otherIncomeOrExpense/100));
                obj.get(key).p_EBT = Math.round(obj.get(key).p_EBIT - obj.get(key).p_NIE - obj.get(key).p_OIOrE);
                obj.get(key).p_taxes = Math.round(obj.get(key).p_EBT * (obj.get(key).taxes/100));
                obj.get(key).p_NetInCome = obj.get(key).p_EBT - obj.get(key).p_taxes;
                //revenueGrowthArray.push(obj.get(key).revenueGrowth);
                }
                totalRevenueArray.push(obj.get(key).totalRevenue);
                p_GrossProfitArray.push(obj.get(key).p_GrossProfit);
                p_EBITArray.push(obj.get(key).p_EBIT);
                p_EBITDAArray.push(obj.get(key).p_EBITDA);
                p_EBTArray.push(obj.get(key).p_EBT);
                p_NetInComeArray.push(obj.get(key).p_NetInCome);
                lastKey = key;
        }
        
        p_totalRevenueChart.series[0].update({data: totalRevenueArray});
        p_grossProfitChart.series[0].update({data: p_GrossProfitArray});
        p_EBITChart.series[0].update({data:p_EBITArray});
        p_EBITDAChart.series[0].update({data:p_EBITDAArray});
        p_EBTChart.series[0].update({data:p_EBTArray});
        p_NetInComeArrayChart.series[0].update({data:p_NetInComeArray});
        // revenueGrowthChart.series[0].update({data:any});
		$(".cover-spin").hide();
    }
    


    $("#scenario1").click(function(){
	$(".cover-spin").show();
    window.location.href='/#/FinancialModel?companyName='+companyName+'&senario=1';
	            location.reload();
		    });
		    $("#scenario2").click(function(){ 
			$(".cover-spin").show();
		    window.location.href='/#/FinancialModel?companyName='+companyName+'&senario=2';	    
		                location.reload();
				});
				$("#scenario3").click(function(){
				$(".cover-spin").show();
				window.location.href='/#/FinancialModel?companyName='+companyName+'&senario=3';	    
				            location.reload();
					            });
						    $("#scenario4").click(function(){
							$(".cover-spin").show();
						    window.location.href='/#/FinancialModel?companyName='+companyName+'&senario=4';	    
						                location.reload();
								        });



									$("#addNewScenario").click(function(){
									$(".cover-spin").show();
									window.location.href='/#/FinancialModel?companyName='+companyName+'&senario='+nextScenarioNo;
									location.reload();
									});



    $("#saveScenario").click(function(){
      $(".cover-spin").show();
       
        for (let [key, value] of actualObj) {
                  let inputObj:any = {};
              
              
                
                    if(typeof actualObj.get(key).COGS !== 'undefined'){
                        
                        inputObj.asof = key.toString();
                        inputObj.cogs = actualObj.get(key).p_COGS;
                        inputObj.cogspercent = actualObj.get(key).COGS;
                        inputObj.companyname = companyName;
                        inputObj.da = actualObj.get(key).p_DAndA;
                        inputObj.dapercent = actualObj.get(key).DAndA;
                        inputObj.ebit = actualObj.get(key).p_EBIT;
                        inputObj.ebitda = actualObj.get(key).p_EBITDA
                        inputObj.ebitdamargin = Math.round((actualObj.get(key).p_EBITDA / actualObj.get(key).totalRevenue) * 100);
                        inputObj.ebitmargin = Math.round((actualObj.get(key).p_EBIT / actualObj.get(key).totalRevenue) * 100);
                        inputObj.ebt = actualObj.get(key).p_EBT;
                        inputObj.ebtmargin = Math.round((actualObj.get(key).p_EBT / actualObj.get(key).totalRevenue) * 100);
                        inputObj.grossprofit = actualObj.get(key).p_GrossProfit;
                        inputObj.grossprofitmargin = Math.round((actualObj.get(key).p_GrossProfit / actualObj.get(key).totalRevenue) * 100);
                        inputObj.latest = actualObj.get(key).latest; 
                        inputObj.netincome = actualObj.get(key).p_NetInCome;
                        inputObj.netincomemargin = Math.round((actualObj.get(key).p_NetInCome / actualObj.get(key).totalRevenue) * 100);
                        inputObj.netinterest =  actualObj.get(key).netinterest;
                        inputObj.netinterestdollars = actualObj.get(key).netIterestExpense; /****/
                        inputObj.otherincome = actualObj.get(key).p_OIOrE;
                        inputObj.otherincomepercent = actualObj.get(key).otherIncomeOrExpense;
                        inputObj.revenuepercent = actualObj.get(key).revenueGrowth;
                        inputObj.scenario = parseInt(scenarioNumber);
                        inputObj.sga = actualObj.get(key).p_SGAndA;
                        inputObj.sgapercent = actualObj.get(key).SGAndA;
                        inputObj.taxes = actualObj.get(key).p_taxes;
                        inputObj.taxespercent = actualObj.get(key).taxes;
                        inputObj.totalrevenue = actualObj.get(key).totalRevenue;
                        inputArray.push(inputObj);
                    }
            
                }
                
                
                let saveDetails = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://34.67.197.111:8000/projections?company="+companyName,
                    "method": "POST",
                    "headers": {
                        "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
                    },
                    "processData": false,
                    "data" : JSON.stringify(inputArray)
                }
                $('#cover-spin').show();
                $.ajax(saveDetails).done(function (response){
                    $('#cover-spin').hide();
                    console.log(response)	
		    // loadData();
		    location.reload();
                     console.log(" scenarioNumber from save function,",scenarioNumber);
                    // scenarioNumber=(parseInt(scenarioNumber)+1).toString();
                });
		});

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


		$('.cover-spin').show();
		        $.ajax(scenarioInput).done(function (response){
			        $('.cover-spin').hide();
				          let str="";
					            let presentScenarios = [];
						              presentScenarios = (JSON.parse(response)).scenarios;
		 str = "<option _ngcontent-sut-c5='' value='"+0+"' ng-reflect-value='"+0+"'> Default </option>";
		 for(var i=1;i<presentScenarios.length;i++){
		  str=str+"<option _ngcontent-sut-c5='' value='"+presentScenarios[i]+"' ng-reflect-value='"+presentScenarios[i]+"'>		 Scenario "+presentScenarios[i]+" </option>";
													              }
														                   		 $("#sel2").html(str);
	if(presentScenarios.includes(Number(scenarioNumber))){
																						$("#sel2").val(scenarioNumber);
																																										 }else{
																																										 																					$("#sel2").val(0);
																																																																																			 }
																																																																																			 																				 if(Number(scenarioNumber) == 0){
																																																																																																							 																					$("#saveScenario").hide();
																																																																																																																																																 }
																																																																																																																																																 																                  });

																		                $( "#sel2" ).change(function() {
																				                
																				                let scerno=$("#sel2").val();
		 window.location.href="/#/FinancialModel?companyname="+companyName+"&scenario="+scerno;
							         window.location.reload();
																											            });

																												    $("#sel4").change(function(){
																												    let pl=$("#sel4").val();
																												    if(pl=="pl"){
																												    window.location.href="#/pdf?CompanyName="+companyName+"##";
																												    window.location.reload();
																												    }else if(pl=="bs"){
																												    window.location.href="/#/rmi?CompanyName="+companyName+"##";
		window.location.reload();																										    }
																									
																												    });
																									



    }
  

 }
   
