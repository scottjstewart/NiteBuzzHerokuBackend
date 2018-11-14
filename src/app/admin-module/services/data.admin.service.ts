import { Injectable } from '@angular/core';
import { AuthUserService } from '../../shared/services/data.auth-user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { map, tap } from 'rxjs/operators';
import { Buzz } from '../../shared/models/buzz.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private users = new BehaviorSubject<User[]>([])
  private loading = new BehaviorSubject<boolean>(false)

  public loading$ = this.loading.asObservable()

  constructor(
    private auth: AuthUserService,
    private http: HttpClient
  ) { }

  adminGetUsers(
    page: number,
    perPage: number,
    sortDirection?: string
  ): Observable<any> {
    let offset = page === 1 ? 0 : perPage * page

    return this.http.get(`/admin/users/`, {
      params: new HttpParams()
        .set('sortDirection', sortDirection)
        .set('pageNumber', page.toString())
        .set('pageSize', perPage.toString())
    }).pipe(
      map(res => res['users']
      )
    )
  }

  adminDeleteUser(id: string): Observable<any> {
    return this.http.delete(`/admin/user/delete/${id}`)
  }

  adminUserCount(): Observable<any> {
    return this.http.get<any>('/admin/user/count')
  }

  adminGetBuzzes(
    page: number,
    perPage: number,
    sortDirection?: string
  ): Observable<Buzz[]> {
    return this.http.get<Buzz[]>('/admin/buzzes', {
      params: new HttpParams()
        .set('sortDirection', sortDirection)
        .set('pageNumber', page.toString())
        .set('pageSize', perPage.toString())
    })
  }

  adminBuzzCount(): Observable<any> {
    return this.http.get<any>('/admin/buzz/count')
  }

  adminDeleteBuzz(id): Observable<any> {
    return this.http.delete(`/admin/buzz/delete/${id}`)
  }

}
