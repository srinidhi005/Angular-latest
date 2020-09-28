
var actualObj = new Map();
var yearsArray = [];
loadActuals();

function loadActuals(){
	 try {
		 var companyName = window.location.href.split("=")[1];
             } catch (error) {
	  	   console.log(error);
	     }

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

	$.ajax(actualsInput).done(function (response){
		let resObject = JSON.parse(response);
		for (let j=0; j<resObject.length; j++){

			 actualObj.set(resObject[j].asof,{
				 "cashequivalents": resObject[j].cashequivalents,
				 "accountsreceivable" : resObject[j].accountsreceivable,
				 "inventories" : resObject[j].inventories,
				 "othercurrentassets": resObject[j].othercurrentassets,
				 "ppe" : resObject[j].ppe,
				 "intangibleassets" : resObject[j].intangibleassets,
				 "goodwill" : resObject[j].goodwill,
				 "otherassets" :resObject[j].otherassets,
				 "totalassets" : resObject[j].totalassets,
				 "totalcurrentassets" :resObject[j].totalcurrentassets,
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
				 "memocheck" : resObject[j].memocheck ,
				 "totalrevenue" : resObject[j].totalrevenue,
				 "cogs" : resObject[j].cogs,
				 "dso" : resObject[j].dso,
				 "inventorydays" : resObject[j].inventorydays,
				 "othercurrentassetspercent" : resObject[j].othercurrentassetspercent,
				 "dpo" : resObject[j].dpo,
				 "accruedliabilitiespercent" : resObject[j].accruedliabilitiespercent,
				 "othercurrentliabilitiespercent" : resObject[j].othercurrentliabilitiespercent

			 });
			yearsArray.push(resObject[j].asof);

		}

		appendTotable();
	});

}
function appendTotable(){

console.log("inside append function",actualObj); 
$("#myTable").find("tr:gt(0)").remove();
console.log("yearsarray",yearsArray);
var str ='<td style="width:400px">&nbsp</td>';
for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="font-weight:bold;text-align:right;font-size:12px;width:85px;padding-right:20px">'+yearsArray[i]+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

      str='<td style="text-align:left;padding-left:5px;font-size:12px">Cash & Equivalents</td>';

for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="text-align:right;padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).cashequivalents)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">Accounts Receivable</td>';

for (let i=0;i<yearsArray.length;i++) {
	 str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).accountsreceivable)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">Inventories</td>';

for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="padding-right:5px; text-align:right ;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).inventories)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">Prepaid Expenses & Other Current Assets</td>';

for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="padding-right:5px; text-align:right ;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).othercurrentassets)+'</td>'; ;
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');


str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px">Total Current Assets</td>';

for (let i=0;i<yearsArray.length;i++) {
	 str = str +  '<td style=" text-align:right;padding-right:5px;font-weight:bold;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalcurrentassets)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');







str='<td style="text-align:left;padding-left:5px;font-size:12px">Property, Plant, & Equipment (PP&E)</td>';

for (let i=0;i<yearsArray.length;i++) {
	 str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).ppe)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');



str='<td style="text-align:left;padding-left:5px;font-size:12px">Intangible Assets</td>';



for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).intangibleassets)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');
/*
str='<td style="font-style: italic;text-align:left;padding-left:5px;font-size:12px">EBITDA Margin</td>';



for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="text-align:right; font-style:italic;padding-right:5px;font-size:12px">'+actualObj.get(yearsArray[i]).p_Ebitdamargin+'%'+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

*/
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

 str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px">Total Assets</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-weight:bold;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalassets)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

 str='<td style="text-align:left;padding-left:5px;font-size:12px">Current Portion of Long-term Debt</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).currentportionlongtermdebt)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

 str='<td style="text-align:left;padding-left:5px;font-size:12px">Accounts Payable</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).accountspayable)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

 str='<td style="text-align:left;padding-left:5px;font-size:12px">Accrued Liabilities</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).accruedliabilities)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

 str='<td style="text-align:left;padding-left:5px;font-size:12px">Other Current Liabilities</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).othercurrentliabilities)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

 str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px">Total Current Liabilities</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-weight:bold;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalcurrentliabilities)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');
 str='<td style="text-align:left;padding-left:5px;font-size:12px">Long-Term Debt</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).longtermdebt)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');
 str='<td style="text-align:left;padding-left:5px;font-size:12px">Other Liabilities</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).otherliabilities)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');
 str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px">Total Liabilities</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-weight:bold;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalliabilities)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">Total Shareholders Equity</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalshareholdersequity)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');


str='<td style="text-align:left;font-weight:bold;padding-left:5px;font-size:12px">Total Liabilities and Shareholders Equity</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right;font-weight:bold; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalliabilitiesandequity)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">Memo Check</td>';
//var matchStr = actualObj.get(yearsArray[i].memocheck)

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+actualObj.get(yearsArray[i]).memocheck+'</td>';
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
