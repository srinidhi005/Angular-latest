import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/addcompany",
    title: "Add Company",
    icon: "icon-atom",
    class: ""
    },
    {
    path: "/rmitemplate",
    title: "RMI Template",
    icon: "icon-align-center",
    class: ""
    },
   
    {
    path: "/pl",
    title: "RMI Insights Credit Scorecard",
    icon: "icon-puzzle",
    class: ""
    },
    {
    path:"/bsheet",
    title:"Balance Sheet",
    icon: "icon-atom",
    class: ""
    },
  {
    path: "/statement",
    title: "Statements",
    icon: "icon-puzzle-10",
    class: ""
    },
    {
    path:"/kpi",
    title:"P&L",
    icon:"icon-puzzle-10",
    class:""
    },

  {
    path: "/AdjustAssumption",
    title: "Adjust Assumption",
    icon: "icon-pin",
    class: "" },
  {
    path: "/Actuals",
    title: "Actuals",
    icon: "icon-bell-55",
    class: ""
  },

  {
    path: "/TargetvActual",
    title: "TargetvActual",
    icon: "icon-single-02",
    class: ""
    },

 
  {
    path: "/FinancialModel",
    title: "Financial Planning",
    icon: "icon-single-02",
    class: ""
  },
 
  {
    path: "/pdf",
    title: "pdf",
    icon: "icon-align-center",
    class: ""
    },
     {
         path: "/user",
	 title: "User Profile",
	 icon:"",
	 class:""

	       }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
