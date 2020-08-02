import { Component, OnInit } from '@angular/core';
import "../../../assets/js/pdf.js";
import * as jsPDF from 'jspdf'; 
// import html2canvas from 'html2canvas';
// import pdfMake from 'pdfmake';
// import 'jspdf-autotable';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  $('.cover-spin').show();
  var companyName = decodeURI(window.location.href).split("=")[1];
 	if(companyName.endsWith("##")){
 	window.location.href=(((decodeURI(window.location.href)).split("=")[0])+"="+(companyName.substring(0,companyName.length-2)));
	window.location.reload();
  }else{
  $('.cover-spin').hide();
  }
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
		  str=str+"<option _ngcontent-sut-c5='' value='"+presentScenarios[i]+"' ng-reflect-value='"+presentScenarios[i]+"'> Scenario "+presentScenarios[i]+" </option>";
		  }
		  $("#sel2").html(str);
		  });
		  }
  

 tableToExcel = (function() {
 let scenario;
	if($("#sel2").val() != undefined){
		scenario = $("#sel2").val();
	}else{
	scenario = 0;
	}
  var companyName = decodeURI(window.location.href).split("=")[1] + " : Scenario "+scenario;

	var dt = new Date();
       	var day = dt.getDate();
		  var month = dt.getMonth()+1 ;
		  var year = dt.getFullYear();	
		  			    				  
	     var postfix = month + "." + day + "." + year ;
	     var uri = 'data:application/vnd.ms-excel;base64,'
		      ,  template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table><h4>{heading}</h4>{table}</table><img src="{imgsrc1}" style="float:left;clear:none;margin-right:50px " height=50 width=100/></body></html>'
		          , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
     
	        return function(table, name) {
				var heading=companyName;
				var  imgsrc1='http://34.67.197.111/assets/img/RMI.jpg';
		 
			    if (!table.nodeType) table = document.getElementById(table)
                // var ctx = {worksheet: name || 'RMI_Insights_Export'+postfix,imgsrc1: imgsrc1,  heading: heading , table: table.innerHTML}
                 var ctx = {worksheet: name+postfix,imgsrc1: imgsrc1,  heading: heading , table: table.innerHTML}
                
			        window.location.href = uri + base64(format(template, ctx))
					  }
})()




download(){
var dt = new Date();
 	 	 var day = dt.getDate();
 		 var month = dt.getMonth()+1 ;
 		 var year = dt.getFullYear();
		 var postfix = month + "." + day + "." + year ;
		let scenario;
	if($("#sel2").val() != undefined){
		scenario = $("#sel2").val() ;
	}else{
	scenario = 1;
	}
	var companyName = decodeURI(window.location.href).split("=")[1] + " : Scenario "+scenario;
	var doc = new jsPDF('l', 'pt');
	var res = doc.autoTableHtmlToJson(document.getElementById('myTable'));
	var height = doc.internal.pageSize.height;
	doc.text(companyName, 42, 60,0,40);
	let pdfName = localStorage.getItem("pdfName");
	if(pdfName != "NA"){
		doc.text(pdfName, (440-(5*pdfName.length)),15,0,0);
	}
	res.data=res.data.slice(1);


	doc.autoTable(res.columns, res.data, {
	  startY: 70
	});
	let baseimage="data:image/jpeg;base64,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";
	doc.addImage(baseimage,45, 500, 120, 30);
	doc.save('RMI_Insights_Export_'+companyName+'_'+ postfix+ '.pdf');
}




// download() {
		
// 	let scenario;
// 	if($("#sel2").val() != undefined){
// 		scenario = $("#sel2").val() ;
// 	}else{
// 	scenario = 1;
// 	}
// 	var companyName = decodeURI(window.location.href).split("=")[1] + " : Scenario "+scenario;
// 	// $('#myTable').prepend('<tr />').children('tr:first').append('<td colspan="8" ><b>'+"  "+' '+companyName+'</b></td>')
// 	// 	$('#myTable').append("<tr><td colspan='8' style='text-align:left' height='40'><img src='http://34.67.197.111/assets/img/RMI.jpg'></td></tr>");
// 	 console.log("clicked");
// 	 var pdf = new jsPDF('p', 'pt','letter');
	
// 	var specialElementHandlers = {
// 		// element with id of "bypass" - jQuery style selector
// 		'#bypassme': function (element, renderer) {
// 			// true = "handled elsewhere, bypass text extraction"
// 			return true
// 		}
// 	};
// 	var margins = {
// 		top: 80,
//             bottom: 60,
//             left: 10,
//             width:700		
// 	};

// 	pdf.fromHTML(
	
// 		// document.getElementById('mydiv').text(),// HTML string or DOM elem ref.
// 		// '<table _ngcontent-qmu-c5="" border="1" id="myTable"><tr _ngcontent-qmu-c5=""></tr><tr><td style="font-weight:bold;text-align:left;font-size:12px">Total Revenue</td><td style="text-align:right;font-weight:bold;font-size:12px">32,376,000</td><td style="text-align:right;font-weight:bold;font-size:12px">34,350,000</td><td style="text-align:right;font-weight:bold;font-size:12px">36,397,000</td><td style="text-align:right;font-weight:bold;font-size:12px">38,580,820</td><td style="text-align:right;font-weight:bold;font-size:12px">40,895,669</td><td style="text-align:right;font-weight:bold;font-size:12px">43,349,409</td><td style="text-align:right;font-weight:bold;font-size:12px">45,950,374</td></tr><tr><td style="text-align:left;font-size:12px">(-) Cost of Goods Sold (COGS)</td><td style="text-align:right; font-size:12px">17,405,000</td><td style="text-align:right; font-size:12px">19,038,000</td><td style="text-align:right; font-size:12px">20,441,000</td><td style="text-align:right; font-size:12px">21,605,259</td><td style="text-align:right; font-size:12px">22,901,575</td><td style="text-align:right; font-size:12px">24,275,669</td><td style="text-align:right; font-size:12px">25,732,209</td></tr><tr><td style="font-weight:bold;text-align:left;font-size:12px">Gross Profit</td><td style=" text-align:right ;font-weight:bold;font-size:12px">14,971,000</td><td style=" text-align:right ;font-weight:bold;font-size:12px">15,312,000</td><td style=" text-align:right ;font-weight:bold;font-size:12px">15,956,000</td><td style=" text-align:right ;font-weight:bold;font-size:12px">16,975,561</td><td style=" text-align:right ;font-weight:bold;font-size:12px">17,994,094</td><td style=" text-align:right ;font-weight:bold;font-size:12px">19,073,740</td><td style=" text-align:right ;font-weight:bold;font-size:12px">20,218,165</td></tr><tr><td style="font-style: italic;text-align:left;font-size:12px">Gross Profit Margin</td><td style="font-style: italic;text-align:right;font-size:12px">46.2%</td><td style="font-style: italic;text-align:right;font-size:12px">44.6%</td><td style="font-style: italic;text-align:right;font-size:12px">43.8%</td><td style="font-style: italic;text-align:right;font-size:12px">43.8%</td><td style="font-style: italic;text-align:right;font-size:12px">43.8%</td><td style="font-style: italic;text-align:right;font-size:12px">43.8%</td><td style="font-style: italic;text-align:right;font-size:12px">43.8%</td></tr><tr><td style="text-align:left;font-size:12px">(-) Selling, General &amp; Administrative Expense (SG&amp;A)</td><td style=" text-align:right;font-size:12px">10,469,000</td><td style=" text-align:right;font-size:12px">10,563,000</td><td style=" text-align:right;font-size:12px">11,511,000</td><td style=" text-align:right;font-size:12px">12,345,862</td><td style=" text-align:right;font-size:12px">13,086,614</td><td style=" text-align:right;font-size:12px">13,871,811</td><td style=" text-align:right;font-size:12px">14,704,120</td></tr><tr><td style="font-weight:bold;text-align:left;font-size:12px">EBIT</td><td style="text-align:right; font-weight:bold;font-size:12px">4,502,000</td><td style="text-align:right; font-weight:bold;font-size:12px">4,749,000</td><td style="text-align:right; font-weight:bold;font-size:12px">4,445,000</td><td style="text-align:right; font-weight:bold;font-size:12px">4,629,699</td><td style="text-align:right; font-weight:bold;font-size:12px">4,907,480</td><td style="text-align:right; font-weight:bold;font-size:12px">5,201,929</td><td style="text-align:right; font-weight:bold;font-size:12px">5,514,045</td></tr><tr><td style="font-style: italic;text-align:left;font-size:12px">EBIT Margin</td><td style="font-style: italic;text-align:right ;font-size:12px">13.9%</td><td style="font-style: italic;text-align:right ;font-size:12px">13.8%</td><td style="font-style: italic;text-align:right ;font-size:12px">12.2%</td><td style="font-style: italic;text-align:right ;font-size:12px">12.2%</td><td style="font-style: italic;text-align:right ;font-size:12px">12.2%</td><td style="font-style: italic;text-align:right ;font-size:12px">12.2%</td><td style="font-style: italic;text-align:right ;font-size:12px">12.2%</td></tr><tr><td style="text-align:left;font-size:12px">(+) Depreciation &amp; Amortization (D&amp;A)</td><td style="text-align:right; font-size:12px">649,000</td><td style="text-align:right; font-size:12px">706,000</td><td style="text-align:right; font-size:12px">747,000</td><td style="text-align:right; font-size:12px">771,616</td><td style="text-align:right; font-size:12px">817,913</td><td style="text-align:right; font-size:12px">866,988</td><td style="text-align:right; font-size:12px">919,007</td></tr><tr><td style="font-weight:bold;text-align:left;font-size:12px">EBITDA</td><td style="text-align:right; font-weight:bold;font-size:12px">5,151,000</td><td style="text-align:right; font-weight:bold;font-size:12px">5,455,000</td><td style="text-align:right; font-weight:bold;font-size:12px">5,192,000</td><td style="text-align:right; font-weight:bold;font-size:12px">5,401,315</td><td style="text-align:right; font-weight:bold;font-size:12px">5,725,393</td><td style="text-align:right; font-weight:bold;font-size:12px">6,068,917</td><td style="text-align:right; font-weight:bold;font-size:12px">6,433,052</td></tr><tr><td style="font-style: italic;text-align:left;font-size:12px">EBITDA Margin</td><td style="text-align:right; font-style:italic;font-size:12px">15.9%</td><td style="text-align:right; font-style:italic;font-size:12px">15.9%</td><td style="text-align:right; font-style:italic;font-size:12px">14.3%</td><td style="text-align:right; font-style:italic;font-size:12px">14.3%</td><td style="text-align:right; font-style:italic;font-size:12px">14.3%</td><td style="text-align:right; font-style:italic;font-size:12px">14.3%</td><td style="text-align:right; font-style:italic;font-size:12px">14.3%</td></tr><tr><td style="text-align:left;font-size:12px">EBIT</td><td style="text-align:right; font-size:12px">4,502,000</td><td style="text-align:right; font-size:12px">4,749,000</td><td style="text-align:right; font-size:12px">4,445,000</td><td style="text-align:right; font-size:12px">4,629,699</td><td style="text-align:right; font-size:12px">4,907,480</td><td style="text-align:right; font-size:12px">5,201,929</td><td style="text-align:right; font-size:12px">5,514,045</td></tr><tr><td style="text-align:left;font-size:12px">(-) Net Interest Expense</td><td style="text-align:right; font-size:12px">-121,000</td><td style="text-align:right; font-size:12px">-137,000</td><td style="text-align:right; font-size:12px">120,000</td><td style="text-align:right; font-size:12px">120,000</td><td style="text-align:right; font-size:12px">120,000</td><td style="text-align:right; font-size:12px">120,000</td><td style="text-align:right; font-size:12px">120,000</td></tr><tr><td style="text-align:left;font-size:12px">(+/-) Other Income/Expense</td><td style="text-align:right; font-size:12px">0</td><td style="text-align:right; font-size:12px">0</td><td style="text-align:right; font-size:12px">0</td><td style="text-align:right; font-size:12px">0</td><td style="text-align:right; font-size:12px">0</td><td style="text-align:right; font-size:12px">0</td><td style="text-align:right; font-size:12px">0</td></tr><tr><td style="font-weight:bold;text-align:left;font-size:12px">EBT</td><td style="text-align:right;font-weight:bold;font-size:12px">4,623,000</td><td style="text-align:right;font-weight:bold;font-size:12px">4,886,000</td><td style="text-align:right;font-weight:bold;font-size:12px">4,325,000</td><td style="text-align:right;font-weight:bold;font-size:12px">4,509,699</td><td style="text-align:right;font-weight:bold;font-size:12px">4,787,480</td><td style="text-align:right;font-weight:bold;font-size:12px">5,081,929</td><td style="text-align:right;font-weight:bold;font-size:12px">5,394,045</td></tr><tr><td style="font-style:italic;text-align:left;font-size:12px">EBT Margin</td><td style="text-align:right; font-style:italic;font-size:12px">14.3%</td><td style="text-align:right; font-style:italic;font-size:12px">14.2%</td><td style="text-align:right; font-style:italic;font-size:12px">11.9%</td><td style="text-align:right; font-style:italic;font-size:12px">11.9%</td><td style="text-align:right; font-style:italic;font-size:12px">11.9%</td><td style="text-align:right; font-style:italic;font-size:12px">11.9%</td><td style="text-align:right; font-style:italic;font-size:12px">12.0%</td></tr><tr><td style="text-align:left;font-size:12px">(-) Taxes</td><td style="text-align:right; font-size:12px">863,000</td><td style="text-align:right; font-size:12px">646,000</td><td style="text-align:right; font-size:12px">2,392,000</td><td style="text-align:right; font-size:12px">947,037</td><td style="text-align:right; font-size:12px">1,005,371</td><td style="text-align:right; font-size:12px">1,067,205</td><td style="text-align:right; font-size:12px">1,132,749</td></tr><tr><td style="font-weight:bold;text-align:left;font-size:12px">Net Income</td><td style="text-align:right; font-weight:bold;font-size:12px">3,760,000</td><td style="text-align:right; font-weight:bold;font-size:12px">4,240,000</td><td style="text-align:right; font-weight:bold;font-size:12px">1,933,000</td><td style="text-align:right; font-weight:bold;font-size:12px">3,562,662</td><td style="text-align:right; font-weight:bold;font-size:12px">3,782,109</td><td style="text-align:right; font-weight:bold;font-size:12px">4,014,724</td><td style="text-align:right; font-weight:bold;font-size:12px">4,261,296</td></tr><tr><td style="font-style: italic;text-align:left;font-size:12px">Net Income Margin</td><td style="text-align:right; font-style: italic;font-size:12px">11.6%</td><td style="text-align:right; font-style: italic;font-size:12px">12.3%</td><td style="text-align:right; font-style: italic;font-size:12px">5.3%</td>'+
// 		// '<td style="text-align:right; font-style: italic;font-size:12px">9.4%</td><td style="text-align:right; font-style: italic;font-size:12px">9.4%</td><td style="text-align:right; font-style: italic;font-size:12px">9.4%</td><td style="text-align:right; font-style: italic;font-size:12px">9.4%</td></tr></table>',
// 		String($("#mydiv").html()),
// 		margins.left, // x coord
// 		margins.top,
		
// 		{ // y coord
			
// 			'width': margins.width, // max width of content on PDF
// 			'elementHandlers': specialElementHandlers
// 		},
		
// 		function (dispose) {
	
// 			pdf.save('Test.pdf');
// 		}, margins
// 		);





// 		html2canvas(document.getElementById('myTable')).then(function (canvas) {
	
// 		  var data = canvas.toDataURL();
																
// 		var dt = new Date();
// 	 	 var day = dt.getDate();
// 		 var month = dt.getMonth()+1 ;
// 		 var year = dt.getFullYear();
// 		 var postfix = month + "." + day + "." + year ;
// 		 	var docDefinition = {
// 			content: [{
		 
// 				image: data,
// 				width: 500,
// 				 }]
// 				 };
// 	pdfMake.createPdf(docDefinition).download('RMI_Insights_Export_'+companyName+'_'+ postfix+ '.pdf');
// 	$("table[id='myTable'] tr:last-child").remove();
// 	$("table[id='myTable'] tr:first-child").remove();
//  });
// }


	// 	download() {
		
	// 	let scenario;
	// 	if($("#sel2").val() != undefined){
	// 		scenario = $("#sel2").val() ;
	// 	}else{
	// 	scenario = 1;
	// 	}
	// 	var companyName = decodeURI(window.location.href).split("=")[1] + " : Scenario "+scenario;
	// 	$('#myTable').prepend('<tr />').children('tr:first').append('<td colspan="8" ><b>'+"  "+' '+companyName+'</b></td>')
	// 	$('#myTable').append("<tr><td colspan='8' style='text-align:left' height='40'><img src='http://34.67.197.111/assets/img/RMI.jpg'></td></tr>");
		

	// 		html2canvas(document.getElementById('myTable'), {
			

				
	// 		                     scale: 5
		  
	//       }	       ).then(function (canvas) {
				    
		
	// 	  var data = canvas.toDataURL();
											    					
	// 	var dt = new Date();
	//  	 var day = dt.getDate();
	// 	 var month = dt.getMonth()+1 ;
	// 	 var year = dt.getFullYear();
	// 	 var postfix = month + "." + day + "." + year ;
	// 	 	var docDefinition = {
	// 		content: [{
			
		      	
	// 		image: data,
	// 		width:500
				
	// 			 }]
	// 			 };
	// pdfMake.createPdf(docDefinition).download('RMI_Insights_Export_'+companyName+'_'+ postfix+ '.pdf');
	// $("table[id='myTable'] tr:last-child").remove();
	// $("table[id='myTable'] tr:first-child").remove();
	// });

	
	// }
 }																							 

				
