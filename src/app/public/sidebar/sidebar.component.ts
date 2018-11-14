import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../shared/services/data.auth-user.service';
import { Router, NavigationEnd, Event } from '@angular/router';
import { LocationService } from '../../shared/services/data.location.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MakebuzzComponent } from '../../user-module/makebuzz/makebuzz.component';
import { AdminAuthService } from 'src/app/admin-module/services/admin-auth.service';
import { AdminService } from 'src/app/admin-module/services/data.admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  logStat: boolean
  loc
  isAdmin: boolean

  constructor(
    private auth: AuthUserService,
    private router: Router,
    private geo: LocationService,
    private dialog: MatDialog
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.logStat = auth.loggedIn()
      }
    })
  }

  ngOnInit() {
    this.logStat = this.auth.loggedIn()
    this.isAdmin = this.auth.isAdmin()
    this.loc = this.geo.getLocation()
    console.log(this.isAdmin)
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  openDialog() {
    const config = new MatDialogConfig;

    config.minHeight = "50vh";

    const dialogRef = this.dialog.open(MakebuzzComponent, config);

    dialogRef.afterClosed().subscribe(data => {

    });
  }

}
