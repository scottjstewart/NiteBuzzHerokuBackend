import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from './public/signup/signup.component'
import { LoginComponent } from './public/login/login.component'
import { HomeComponent } from './public/home/home.component';
import { ContactComponent } from './public/contact/contact.component'
import { AboutComponent } from './public/about/about.component'
import { NotFoundComponent } from './public/not-found/not-found.component'
import { BuzzDetailComponent } from './public/buzz-detail/buzz-detail.component';

const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: 'buzz/detail/:id',
    component: BuzzDetailComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
