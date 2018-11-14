import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const base = 'http://127.0.0.1:5000'

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            url: base + req.url
        })
        return next.handle(req)
    }
}