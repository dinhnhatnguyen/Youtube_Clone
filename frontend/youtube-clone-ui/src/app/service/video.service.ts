import {Injectable, NgModule} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {UploadVideoResponse} from "../upload-video/UploadVideoResponse";;
import {HttpService} from "./httpService.service";
import {VideoDto} from "../dto/video-dto";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class VideoService {
  constructor(private httpClient: HttpClient) {
  }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);

    // HTTP Post call to upload the video
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos", formData);
  }

  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId', videoId);

    // HTTP Post call to upload the thumbnail
    return this.httpClient.post("http://localhost:8080/api/videos/thumbnail", formData, {
      responseType: 'text'
    });
  }

  getVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>(`http://localhost:8080/api/videos/${videoId}`);
  }
}

