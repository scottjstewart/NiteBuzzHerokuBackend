//angular imports
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { MaterialModule } from "./material";//array: angular material imports
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { MatDialogModule } from "@angular/material";

//component imports
import { SidebarComponent } from './public/sidebar/sidebar.component'
import { AppComponent } from "./app.component";
import { LoginComponent } from './public/login/login.component'
import { SignupComponent } from './public/signup/signup.component';
import { FooterComponent } from './public/footer/footer.component';
import { HomeComponent } from './public/home/home.component'
import { ContactComponent } from './public/contact/contact.component'
import { AboutComponent } from './public/about/about.component'
import { NotFoundComponent } from './public/not-found/not-found.component'
import { BuzzDetailComponent } from './public/buzz-detail/buzz-detail.component';
import { CommentDialogComponent } from './user-module/comment.dialog/comment.dialog.component'
import { MakebuzzComponent } from "./user-module/makebuzz/makebuzz.component";
import { UpdateUserComponent } from "./user-module/account/update-user/update-user.component";

//module imports
import { UserModule } from "./user-module/user.module";
import { ClientModule } from "./client-module/client.module";
import { AdminModule } from "./admin-module/admin.module";
import { AppRoutingModule } from "./app-routing.module";

//interceptors
import { UrlInterceptor } from "./shared/interceptors/intercept.url";

//token retrieval function for auth0
export function tokenGetter() {
  return localStorage.getItem('sessionToken')
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    SignupComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    NotFoundComponent,
    BuzzDetailComponent,
    CommentDialogComponent,
  ],

  imports: [
    BrowserModule,
    UserModule,
    ClientModule,
    AdminModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    ScrollingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          'localhost:3000'
        ],
        blacklistedRoutes: [
          'localhost:3000/user/login',
          'localhost:3000/user/signup',
        ],
        authScheme: '',
      }
    }),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    }
  ],

  bootstrap: [
    AppComponent
  ],

  entryComponents: [
    CommentDialogComponent,
    MakebuzzComponent,
    UpdateUserComponent
  ]

})

export class AppModule { }

