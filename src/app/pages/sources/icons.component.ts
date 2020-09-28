import { Component, OnInit } from "@angular/core";
import "../../../assets/js/import.js";

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
  constructor() {}

  ngOnInit() {

  $("#addComBTN").click(function(){
   $("#modalPopUpId").click();  
  }); 
     $("#modalPopUpId").click();
     $("#modalPopUpId").click(function(){
        $("#company,#period,#statementtype,#industry,#inputfilenow").val("");
        $("#startImportBtn").prop("disabled",true);
    });   
  }
   
}
