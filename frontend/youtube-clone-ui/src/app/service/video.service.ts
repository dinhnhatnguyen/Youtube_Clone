import {Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs';
import {UploadVideoResponse} from "../upload-video/UploadVideoResponse";;
import {HttpService} from "./httpService.service";


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


  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId', videoId);

    // HTTP Post call to upload the thumbnail
    // @ts-ignore
    return this.httpService.post("http://localhost:8080/api/videos/thumbnail", formData, {
      responseType: 'text'
    });
  }
}

