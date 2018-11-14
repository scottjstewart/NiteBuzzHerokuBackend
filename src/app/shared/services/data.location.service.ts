import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() { }

  getLocation(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          observer.next(position);
          observer.complete();
        },
        (error: PositionError) => {
          console.log('Geolocation service: ' + error.message);
          observer.error(error);
        }
      );
    });
  }

  //not working yet: remove private marker when functional
  private getLocationPersist(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      if (window.navigator && window.navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
          observer.next(position)
        },
          error => {
            switch (error.code) {
              case 1:
                observer.error({ error: 'Location access Denied' })
                break;
              case 2:
                observer.error({ error: 'Position is unavailable from device' })
                break;
              case 3:
                observer.error({ error: 'Location update timed out' })
            }
          }
        )
      } else {
        observer.error({ error: 'Browser does not support geolocation.' })
      }
    })
  }
}
