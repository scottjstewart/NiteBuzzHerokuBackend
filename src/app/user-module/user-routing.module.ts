import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../shared/guards/user.guard';
import { AccountComponent } from './account/account.component';
import { UserComponent } from './user/user.component';

const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [UserGuard],
    canActivateChild: [UserGuard],
    children: [
      {
        path: 'account',
        component: AccountComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
