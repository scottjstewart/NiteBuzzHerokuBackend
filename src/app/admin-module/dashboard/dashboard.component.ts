import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';
import { UserDataSource } from '../data-sources/user-data-source.service';
import { AdminService } from '../services/data.admin.service';
import { BuzzDataSourceService } from '../data-sources/buzz-data-source.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  count
  bCount
  dataSource: UserDataSource
  buzzSource: BuzzDataSourceService
  displayedColumns = ['Username', 'FirstName', 'Email', 'Role', 'Edit', 'Delete']
  buzzColumns = ['Title', 'Location', 'Category', 'Price', 'funFactor', 'UpVote', 'userName', "Edit", 'Delete']

  @ViewChild('userPaginator') paginator: MatPaginator
  @ViewChild('buzzPaginator') buzzPaginator: MatPaginator

  constructor(
    private admin: AdminService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.admin.adminUserCount().subscribe(
      res => this.count = res.count
    )
    this.admin.adminBuzzCount().subscribe(
      res => this.bCount = res.count
    )
    this.dataSource = new UserDataSource(this.admin, this.paginator)
    this.dataSource.loadUsers('asc', 0, 5)
    this.buzzSource = new BuzzDataSourceService(this.admin, this.buzzPaginator)
    this.buzzSource.loadBuzzes('asc', 0, 5)
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.loadPage())
    ).subscribe()
    this.buzzPaginator.page.pipe(
      tap(() => this.loadBuzz())
    ).subscribe()
  }

  loadPage() {
    this.dataSource.loadUsers(
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize
    )
  }

  loadBuzz() {
    this.buzzSource.loadBuzzes(
      'asc',
      this.buzzPaginator.pageIndex,
      this.buzzPaginator.pageSize
    )
  }

  editUser() {

  }

  editBuzz() {

  }

  deleteUser(id: string) {
    this.admin.adminDeleteUser(id).subscribe(
      res => {
        if (res.success === true) {
          this.snackbar.open(res.message, "Ok", { duration: 4500 })
          this.loadPage()
        } else if (res.success === false) {
          this.snackbar.open(res.message, 'Ok', { duration: 4500 })
        } else {
          this.snackbar.open('Unknown error has occurred', 'Ok', { duration: 4500 })
        }
      }
    )
  }

  deleteBuzz(id) {
    console.log('buzz delete init')
    this.admin.adminDeleteBuzz(id).subscribe(
      res => {
        if (res.success === true) {
          this.snackbar.open(res.message, "Ok", { duration: 4500 })
          this.loadBuzz()
        } else if (res.success === false) {
          this.snackbar.open(res.message, 'Ok', { duration: 4500 })
        } else {
          this.snackbar.open('Unknown error has occurred', 'Ok', { duration: 4500 })
        }
      }
    )
  }

}
