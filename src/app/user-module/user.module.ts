//angular imports
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from '../material'; //angular material imports
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//component imports
import { UserComponent } from './user/user.component';
import { AccountComponent } from './account/account.component';
import { MakebuzzComponent } from './makebuzz/makebuzz.component';
import { UpdateUserComponent } from './account/update-user/update-user.component';

//module imports
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    BrowserAnimationsModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    ScrollingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],

  declarations: [
    UserComponent,
    AccountComponent,
    MakebuzzComponent,
    UpdateUserComponent
  ]
})
export class UserModule { }
