import { HttpClient } from "@angular/common/http";
import {from, lastValueFrom, map, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


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

  get<T>(url: string, asObservable: boolean = true): Observable<T> | Promise<T> {
    if (asObservable) {
      return this.http.get<T>(url);
    } else {
      return lastValueFrom(this.http.get<T>(url));
    }
  }

  // get<T>(url: string, options?: { responseType?: 'json' | 'text' }): Observable<T> {
  //   // @ts-ignore
  //   let observable = this.http.get<T>(url, options);
  //   if (options?.responseType === 'json') {
  //     return observable.pipe(
  //       map(response => {
  //         // @ts-ignore
  //         return response.body as T;
  //       })
  //     );
  //   }
  //   // @ts-ignore
  //   return observable;
  // }

  put<T>(url: string, data: any, options?: { responseType?: 'json' | 'text' }): Observable<T> {
    // @ts-ignore
    let observable = this.http.put<T>(url, data, options);
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

  patch<T>(url: string, data: any, options?: { responseType?: 'json' | 'text' }): Observable<T> {
    // @ts-ignore
    let observable = this.http.patch<T>(url, data, options);
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

  delete<T>(url: string, options?: { responseType?: 'json' | 'text' }): Observable<T> {
    // @ts-ignore
    let observable = this.http.delete<T>(url, options);
    if (options?.responseType === 'text') {
      return observable.pipe(
        map(response => {
          // @ts-ignore
          return response.body as T;
        })
      );
    }
    // @ts-ignores
    return observable;
  }
}
