function allowAlphaNumeric(e) {
    var code = ('charCode' in e) ? e.charCode : e.keyCode;
    if ( !(code > 47 && code < 58) && // numeric (0-9)
	            !(code > 64 && code < 91) && // upper alpha (A-Z)
                !(code > 96 && code < 123)) { // lower alpha (a-z)
        e.preventDefault();
    }
}

var validationFlag = false;

function enableMsg(flag,text){
    if(flag){
        $("#successDiv").show();
        $("#successText").text(text);
        setTimeout(function(){
            $("#successDiv").hide(); 
        }, 5000);
    }else{
        $("#errorDiv").show();
        $("#errorText").text(text);
        setTimeout(function(){
            $("#errorDiv").hide(); 
        }, 5000);
    }
}

function validate(){
    validationFlag = false;
    if (document.getElementById('inputfilenow').files[0]== undefined){
		validationFlag=true;
    }else if($("#company").val() == ""){
        validationFlag=true;
    }else if($("#period").val() == ""){
        validationFlag=true;
    }else if($("#statementtype").val() == ""){
        validationFlag=true;
    }else if($("#industry").val() == ""){
        validationFlag=true;
    }
    if(validationFlag){
        //enableMsg(!validationFlag,"Some fields are missing!!."); 
         $("#startImportBtn").prop("disabled",true);
    }else{
        validationFlag = !validationFlag;
        $("#startImportBtn").prop("disabled",false);
    }
}

function importupload(ev){
    $('.cover-spin').show();
    ev.preventDefault();
    
    var company = $("#company").val();
    var file = document.getElementById('inputfilenow').files[0];
        var period = $("#period").val();
        var statementtype = $("#statementtype").val();
        var industry = $("#industry").val();
        var data = new FormData();
        data.append("file", file);
        data.append("company",company);
        data.append("period",period);
        data.append("statementtype",statementtype);
        data.append("industry",industry);
        validate();
        if(!validationFlag) {
            $('.cover-spin').hide();
            return;
        }    
        let input = {
            "async": true,
            "crossDomain": true,
            "url": "http://34.67.197.111:8000/companies",
            "method": "GET",			
            "headers": {
                        "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
                        },
            "processData": false,
		}
        $.ajax(input).done(function (response){
            var companiesArray=((JSON.parse(response)).companies);
			var flag = false;
			for(var i=0;i<companiesArray.length;i++){
                if(companiesArray[i].toUpperCase()==company.toUpperCase())
					{
                        flag = true;
					}
            }
            if(flag){
                enableMsg(!validationFlag,"Name already exists. Please enter a unique company name"); 
                $("#startImportBtn").prop("disabled",true);
                $('.cover-spin').hide();
                return;
            }else{
                $.ajax({
                      type: 'POST',
                      enctype: 'multipart/form-data',
                      processData: false,
                      contentType: false,
                      url: '/upload',
                      data:data,
                      success: function(data) {
                          setTimeout(function(){
                              $('.cover-spin').hide();
                              enableMsg(true,"File uploaded successfully, please click on the statements tab to view summary and details");
                              $("#myModal").modal('hide');
                          }, 5000);
                      },
                      error: function(data){
                          setTimeout(function(){
                              $('.cover-spin').hide(); 
                              enableMsg(false,"Error in processing, please try again.");
                          }, 5000);
                      },
                });                
            }
		}).fail(function(xhr){
            $("#startImportBtn").prop("disabled",true);
            $('.cover-spin').hide();
        });
}