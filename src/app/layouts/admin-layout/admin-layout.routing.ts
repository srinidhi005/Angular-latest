import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/sources/icons.component";
import { MapComponent } from "../../pages/AdjustAssumptions/map.component";
import { NotificationsComponent } from "../../pages/Actuals/notifications.component";
import { UserComponent } from "../../pages/FinancialModel/user.component";
import { TablesComponent } from "../../pages/statement/tables.component";
import { TargetvActualComponent } from "../../pages/TargetvActual/TargetvActual.component";
import {PdfComponent} from "../../pages/pdf/pdf.component";
import {ProfileComponent} from "../../pages/user/profile.component";
import {KpiComponent} from "../../pages/kpi/kpi.component";
export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "addcompany", component: IconsComponent },
  { path: "AdjustAssumption", component: MapComponent },
  { path: "Actuals", component: NotificationsComponent },
  { path: "TargetvActual", component: TargetvActualComponent },
  { path: "statement", component: TablesComponent },
   { path: "FinancialModel", component: UserComponent },
   { path: "pdf", component: PdfComponent },
   {path:"user",component:ProfileComponent},
{path:"kpi",component:KpiComponent}
];
