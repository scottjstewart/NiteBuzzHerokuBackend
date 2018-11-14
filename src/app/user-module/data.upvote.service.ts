import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpvoteService {

  constructor(
    private http: HttpClient
  ) { }

  plusOne(id): Observable<any> {
    return this.http.post(`/plusOne/${id}`, {}).pipe(
      catchError(this.handleError('plusOne', []))
    )
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
