import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { AdminService } from '../services/data.admin.service';
import { BehaviorSubject, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
import { Buzz } from 'src/app/shared/models/buzz.model';

@Injectable({
  providedIn: 'root'
})
export class BuzzDataSourceService extends DataSource<Buzz> {
  private buzzes = new BehaviorSubject<Buzz[]>([])
  private loading = new BehaviorSubject<boolean>(false)

  public loading$ = this.loading.asObservable()

  constructor(
    private admin: AdminService,
    private paginator: MatPaginator
  ) {
    super()
  }

  connect(collection: CollectionViewer) {
    return this.buzzes.asObservable()
  }

  disconnect(collection: CollectionViewer) {
    this.buzzes.complete()
    this.loading.complete()
  }

  loadBuzzes(
    sortDirection = 'asc',
    pageIndex = 0,
    pageSize = 5
  ) {
    this.loading.next(true)

    this.admin.adminGetBuzzes(
      pageIndex,
      pageSize,
      sortDirection,
    ).pipe(
      catchError(() => of([])),
      finalize(() => this.loading.next(false))
    ).subscribe(
      buzzs => this.buzzes.next(buzzs)
    )
  }

}
