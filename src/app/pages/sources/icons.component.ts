import { Component, OnInit } from "@angular/core";
import "../../../assets/js/import.js";

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  
     $("#modalPopUpId").click(function(){
        $("#company,#period,#statementtype,#industry,#inputfilenow").val("");
        $("#startImportBtn").prop("disabled",true);
    });   
  }
   
}
