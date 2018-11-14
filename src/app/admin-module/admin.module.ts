//angular imports
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from '../material' //angular material imports

//component imports
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from "./admin/admin.component";

//module imports
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminAccountComponent } from './admin-account/admin-account.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    AdminComponent,
    AdminAccountComponent
  ]
})
export class AdminModule { }
