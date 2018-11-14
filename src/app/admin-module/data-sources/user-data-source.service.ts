import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { AdminService } from '../services/data.admin.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataSource extends DataSource<User>{

  private users = new BehaviorSubject<User[]>([])
  private loading = new BehaviorSubject<boolean>(false)

  public loading$ = this.loading.asObservable()

  constructor(
    private admin: AdminService,
    private paginator: MatPaginator
  ) { super() }

  connect(collection: CollectionViewer): Observable<User[]> {
    return this.users.asObservable()
  }

  disconnect(collection: CollectionViewer) {
    this.users.complete()
    this.loading.complete()
  }

  loadUsers(
    sortDirection = 'asc',
    pageIndex = 0,
    pageSize = 5
  ) {
    this.loading.next(true)

    this.admin.adminGetUsers(pageIndex, pageSize, sortDirection).pipe(
      catchError(() => of([])),
      finalize(() => this.loading.next(false))
    ).subscribe(
      users => {
        this.users.next(users)
      }
    )
  }

}
