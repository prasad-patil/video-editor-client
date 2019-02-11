import { VideoInfo } from './../../models/video-info';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {
  videoInfo: VideoInfo;
  errorMessage = 'Please enter a value';
  successMessage = '';
  files = [];
  uploader: FileUploader;

  constructor(private router: Router) {
    this.videoInfo = new VideoInfo();
  }

  ngOnInit() {
    this.uploader = new FileUploader({ url: environment.baseUrl + 'upload' });
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      this.videoInfo.filename = file._file.name;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) =>
      this.onSuccessItem(item, response, status, headers);
  }

  onSuccessItem(item, response, status, headers) {
    this.router.navigate(['/videos']);
  }
  onSubmit() {
    console.log(this.videoInfo);
    this.uploader.uploadAll();
  }

  onCancel() {
    this.router.navigate(['/videos']);
  }
}
