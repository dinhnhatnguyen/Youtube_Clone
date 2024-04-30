import { HttpClient } from "@angular/common/http";
import {lastValueFrom, map, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // post<T>(url: string, data: any, observable: boolean = true): Observable<T> | Promise<T> {
  //   if (observable) {
  //     return this.http.post<T>(url, data);
  //   } else {
  //     return lastValueFrom(this.http.post<T>(url,data)); // using lasValueFrom to change an observable to Promise
  //   }
  // }

  post<T>(url: string, data: any, options?: { responseType?: 'json' | 'text' }): Observable<T> {
    // @ts-ignore
    let observable = this.http.post<T>(url, data, options);
    if (options?.responseType === 'text') {
      return observable.pipe(
        map(response => {
          // @ts-ignore
          return response.body as T;
        })
      );
    }
    // @ts-ignore
    return observable;
  }
}
