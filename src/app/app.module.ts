import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { LoginComponent } from './login/login.component';
import { KpiComponent } from './pages/kpi/kpi.component';
import { MetricsComponent } from './pages/metrics/metrics.component';
import { BalancesheetComponent } from './pages/balancesheet/balancesheet.component';
import { RmitemplateComponent } from './pages/rmitemplate/rmitemplate.component';
import { PlComponent } from './pages/pl/pl.component';
import { BsheetComponent } from './pages/bsheet/bsheet.component';
import { BalancevisualComponent } from './pages/balancevisual/balancevisual.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent, KpiComponent, MetricsComponent, BalancesheetComponent, RmitemplateComponent, PlComponent, BsheetComponent, BalancevisualComponent],
  providers: [],
  bootstrap: [AppComponent],
	exports:[LoginComponent]
})
export class AppModule {}
