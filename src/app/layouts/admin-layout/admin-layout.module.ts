import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/sources/icons.component";
import { MapComponent } from "../../pages/AdjustAssumptions/map.component";
import { NotificationsComponent } from "../../pages/Actuals/notifications.component";
import { UserComponent } from "../../pages/FinancialModel/user.component";
import { TablesComponent } from "../../pages/statement/tables.component";
import { TargetvActualComponent } from "../../pages/TargetvActual/TargetvActual.component";
import {PdfComponent} from "../../pages/pdf/pdf.component";
import {LoginComponent} from "../../pages/login/login.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {ProfileComponent} from "../../pages/user/profile.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    TargetvActualComponent,
    TablesComponent,
    IconsComponent,
    UserComponent,
    NotificationsComponent,
    MapComponent,
    PdfComponent,
    LoginComponent,
    ProfileComponent
  ]
})
export class AdminLayoutModule {}
