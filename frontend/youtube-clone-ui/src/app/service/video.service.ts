import { Injectable } from '@angular/core';
import { FileSystemFileEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs';
import {HttpService} from "./httpService.service";
import {UploadVideoResponse} from "../upload-video/UploadVideoResponse";


@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private httpService: HttpService) { }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);

    // HTTP Post call to upload the video
    // @ts-ignore
    return this.httpService.post<UploadVideoResponse>("http://localhost:8080/api/videos", formData);
  }
}
