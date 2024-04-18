import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "../upload-video/UploadVideoResponse";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(url: string, data: any): Observable<UploadVideoResponse>   {
    return this.http.post<UploadVideoResponse>(url, data);
  }
}
