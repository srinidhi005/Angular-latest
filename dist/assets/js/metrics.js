var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
			   });
			   try {
				var companyName = window.location.href.split("=")[1];
			   } catch (error) {
				   console.log(error);
			   }

$("#actualsId").attr("href","/balance-actuals?CompanyName="+companyName);
	//$("#financialId").attr("href","/FinancialModel?CompanyName="+companyName+'&senario=1');
	$("#metricsId").attr("href","/rmi?CompanyName="+companyName);
function updateProjectionPdf(){
var actualObj = new Map();
var rojectionObj = new Map();
	var actualXAxis = [];
		var yearsArray = [];
	var previousAmount = 0;
	var cashequivalents=[];
function loadActuals(){
let actualsInput = {

	"async": true,
	"crossDomain": true,
	"url": "http://34.67.197.111:8000/balance?company="+companyName,
	"method": "GET",
	"headers": {
		"authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
		"content-type": "application/json",
		"cache-control": "no-cache",
		"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
	},
	"processData": false,
}
	

	$.ajax(actualsInput).done(function (response){
			let resObject = JSON.parse(response);
			for (let j=0; j<resObject.length; j++) {
	
				if( resObject[j].latest === 0){
					previousAmount = resObject[j].cashequivalents;
				}
				actualObj.set(resObject[j].asof,{
									"cashequivalents": cashequivalents ,
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
			//	 console.log(actualObj);
	});
}
}
/*function updateProjectionPdf(){

let scenario = $("#sel2").val();
yearsArray=[]
actualObj.clear();
loadData(scenario);
}
	function loadData(scenario){
	//actualObj.clear();
	loadActuals();
	let assumptionInput = {
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

    
	$.ajax(assumptionInput).done(function (response){
					resObject = JSON.parse(response);
					let totalRevenue = 0;
					let revenueGrowthArray = [];
					let COGSArray = [];
					let SGAndAArray = [];
					let DAndAArray = [];
					let otherIncomeOrExpenseArray = [];
					let netinterestdollarsArray = [];
					//actualObj.clear();
					//yearsArray = [];
					for (let j=0; j<resObject.length; j++) {
						if(j == 0){
							totalRevenue = Math.round(previousAmount + (previousAmount * (resObject[j].revenuepercent/100)));
						}else{
							totalRevenue = Math.round(resObject[j-1].totalRevenue + (resObject[j-1].totalRevenue * (resObject[j].revenuepercent/100)));
						}
						actualObj.set(resObject[j].asof,{
									"cashequivalents": cashequivalents ,
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
					appendTotable();
					//console.log("Actual OBJ:",actualObj);
					
	
	});
	
	}*/
/*	function visuals(){
		var companyName = decodeURI(window.location.href).split("=")[1];
	 	window.location.href = "/#/FinancialModel?companyname="+companyName+"&scenario=1";
 	}
function updateProjection(obj){
	console.log(obj);
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
			obj.get(key).p_GrossProfitMargin = obj.get(key).p_GrossProfitMargin;
			obj.get(key).p_Ebitmargin = obj.get(key).p_Ebitmargin;
			obj.get(key).p_Ebitdamargin = obj.get(key).p_Ebitdamargin;
			obj.get(key).p_NetIM = obj.get(key).p_NetIM;
			//revenueGrowthArray.push(obj.get(key).revenueGrowth);
			}
	lastKey = key;
	}
	}*/
	
function appendTotable(){
	$("#myTable").find("tr:gt(0)").remove();	
	console.log("yearsarray",yearsArray);
	var str ='<td style="width:400px">&nbsp</td>';
	for (let i=0;i<yearsArray.length;i++) {
		str = str +  '<td style="font-weight:bold;text-align:right;font-size:12px;width:85px;padding-right:20px">'+yearsArray[i]+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
		       str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px">Cash Equivalents</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
		str = str +  '<td style="text-align:right;padding-right:5px;font-weight:bold;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).cashequivalents)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	str='<td style="text-align:left;padding-left:5px;font-size:12px">Accounts Receivable</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	  str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).accountsreceivable)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px">Inventories</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
		str = str +  '<td style="padding-right:5px; text-align:right ;font-weight:bold;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).inventories)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	str='<td style="font-style: italic;text-align:left;padding-left:5px;font-size:12px">Othercurrent Assets</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
		str = str +  '<td style="padding-right:5px; text-align:right ;font-weight:bold;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).inventories)+'</td>';	;	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	
	str='<td style="text-align:left;padding-left:5px;font-size:12px">Total Current Assets</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	  str = str +  '<td style=" text-align:right;padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalcurrentassets)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px">EBIT</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
		str = str +  '<td style="text-align:right; padding-right:5px;font-weight:bold;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).p_EBIT)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	
	
	str='<td style="font-style: italic;text-align:left;padding-left:5px;font-size:12px">EBIT Margin</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
		str = str +  '<td style="font-style: italic;text-align:right ;padding-right:5px;font-size:12px">'+actualObj.get(yearsArray[i]).p_Ebitmargin+'%'+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	
	str='<td style="text-align:left;padding-left:5px;font-size:12px">PPE</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	  str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).ppe)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	
	
	str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px">IntangibleAssets</td>';
	
	
	
	for (let i=0;i<yearsArray.length;i++) {
		str = str +  '<td style="text-align:right; padding-right:5px;font-weight:bold;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).intangibleassets)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	str='<td style="font-style: italic;text-align:left;padding-left:5px;font-size:12px">EBITDA Margin</td>';
	
	
	
	for (let i=0;i<yearsArray.length;i++) {
		str = str +  '<td style="text-align:right; font-style:italic;padding-right:5px;font-size:12px">'+actualObj.get(yearsArray[i]).p_Ebitdamargin+'%'+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">Goodwill</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).goodwill)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">Other Assets</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).otherassets)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">TotalAssets</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalassets)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">CurrentPortionLongtermDebt</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).currentportionlongtermdebt)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">Accounts Payable</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).accountspayable)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">AccruedLiabilities</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).accruedliabilities)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">Other Current Liabilities</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).othercurrentliabilities)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">Total Current Liabilities</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalcurrentliabilities)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">Long Term Debt</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).longtermdebt)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">Other Liabilities</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).otherliabilities)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	  str='<td style="text-align:left;padding-left:5px;font-size:12px">TotalLiabilities</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalliabilities)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	 str='<td style="text-align:left;padding-left:5px;font-size:12px">Total Shareholders Equity</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalshareholdersequity)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	
	 str='<td style="text-align:left;padding-left:5px;font-size:12px">Total Liabilities and Equity</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalliabilitiesandequity)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	 str='<td style="text-align:left;padding-left:5px;font-size:12px">Memo Check</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).memocheck)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	 str='<td style="text-align:left;padding-left:5px;font-size:12px">Total Revenue</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalrevenue)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	 str='<td style="text-align:left;padding-left:5px;font-size:12px">Cogs</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).cogs)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	 str='<td style="text-align:left;padding-left:5px;font-size:12px">DSO</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).dso)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	 str='<td style="text-align:left;padding-left:5px;font-size:12px">Inventory Days</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).inventorydays)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	 str='<td style="text-align:left;padding-left:5px;font-size:12px">Other Current Assets Percent</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).othercurrentassetspercent)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	 str='<td style="text-align:left;padding-left:5px;font-size:12px">DPO</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).dpo)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	str='<td style="text-align:left;padding-left:5px;font-size:12px">Accrued Liabilities Percent</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).accruedliabilitiespercent)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');
	
	str='<td style="text-align:left;padding-left:5px;font-size:12px">Othercurrent Liabilities Percent</td>';
	
	for (let i=0;i<yearsArray.length;i++) {
	    str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).othercurrentliabilitiespercent)+'</td>';	
	}
	$('#myTable tr:last').after('<tr>'+str+'</tr>');

	}

	$("#sel2").val("1");
	updateProjectionPdf();

