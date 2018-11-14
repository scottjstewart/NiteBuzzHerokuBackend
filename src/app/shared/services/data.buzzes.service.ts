import { Injectable } from "@angular/core";
import { Observable, of, ReplaySubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { AuthUserService } from "./data.auth-user.service";
import { Buzz } from "../models/buzz.model";

@Injectable({
  providedIn: "root"
})

export class BuzzesService {

  private buzzr = new ReplaySubject<Buzz>();
  buzzr$ = this.buzzr.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthUserService
  ) { }

  getBuzzes(): Observable<any> {
    return this.http.get<any>("/buzz/get").pipe(
      tap(res => console.log(res)),
      catchError(this.handleError("getBuzzes", []))
    );
  }

  getBuzzById(id: string | number): Observable<Buzz> {
    return this.http.get<Buzz>(`/buzz/byId/${id}`);
  }

  getBuzz(buzzId) {
    return this.http.get("/buzz/own" + buzzId);
  }


  makeBuzz(buzz: Buzz): Observable<Buzz> {
    return this.http
      .post<Buzz>("/buzz/makeBuzz", buzz)
      .pipe(tap(res => this.buzzr.next(res)));
  }

  deleteBuzz(id: string | number): Observable<any> {
    return this.http
      .delete<Buzz>(`/buzz/delete/${id}`)
      .pipe(catchError(this.handleError("deleteBuzz", [])));
  }

  updateBuzz(buzz: Buzz): Observable<any> {
    console.log('updateBuzz init', buzz)
    return this.http
      .put(`/buzz/update/${buzz.id}`, buzz)
      .pipe(catchError(this.handleError("updateBuzz", [])));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
