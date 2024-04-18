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

  uploadVideo(fileEntry: FileSystemFileEntry): Observable<UploadVideoResponse> {
    return fileEntry.file(file => {
      const fd = new FormData();
      fd.append('file', file, file.name);
      return this.httpService.post('http://localhost:8080/api/videos', fd);
    });
  }
}
