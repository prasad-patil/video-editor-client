import { FilesService } from './../../services/files.service';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-upload-download',
  templateUrl: './upload-download.component.html',
  styleUrls: ['./upload-download.component.css']
})
export class UploadDownloadComponent implements OnInit {
  files = [];
  private url = 'http://localhost:3000/upload';
  uploader: FileUploader;

  constructor(private fileService: FilesService) {}

  ngOnInit() {
    this.uploader = new FileUploader({ url: this.url });

    this.fileService.showFileNames().subscribe((response: any[]) => {
      for (let i = 0; i < response.length; i++) {
        this.files[i] = {
          filename: response[i].filename,
          originalname: response[i].originalname,
          contentType: response[i].contentType
        };
      }
    });
  }
  downloadPdf(filename, contentType) {
    this.fileService.downloadPDF(filename, contentType).subscribe(res => {
      const file = new Blob([res], { type: contentType });
      console.log(URL.createObjectURL(file));

      const a = document.createElement('a');
      a.style.display = 'none';
      document.body.appendChild(a);
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}
