import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {
  MatChip, MatChipEditedEvent, MatChipGrid,
  MatChipInput,
  MatChipInputEvent, MatChipRow,
} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../service/video.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VideoPlayerComponent} from "../video-player/video-player.component";


@Component({
  selector: 'app-save-video-details',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatLabel,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatChipInput,
    MatChip,
    MatIcon,
    MatButton,
    MatChipGrid,
    MatChipRow,
    VideoPlayerComponent,
  ],
  providers: [VideoService],
  templateUrl: './save-video-details.component.html',
  styleUrl: './save-video-details.component.css'
})
export class SaveVideoDetailsComponent implements OnInit {

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName = '';
  videoId = '';
  fileSelected = false;
  videoUrl!: string;
  private announcer: any;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService,
              private matSnackBar: MatSnackBar) {

    this.videoId = this.activatedRoute.snapshot.params["videoId"];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
    })

    // this.videoUrl = "https://ytclonebynhat.s3.ap-southeast-1.amazonaws.com/90f68a66-5666-4d68-a4c1-6b69c86dc0c4mp4";

    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    })

  }

  ngOnInit(): void {}




  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${value}`);
    }
  }

  edit(fruit: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }


  onFileSelected($event: Event) {
    // @ts-ignore
    this.selectedFile = $event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
  }

  onUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(() => {
        // show an upload success notification.
        this.matSnackBar.open("Thumbnail Upload Successful", "OK");
      })
  }
}


