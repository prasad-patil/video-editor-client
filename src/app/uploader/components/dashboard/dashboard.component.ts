import { FilesService } from './../../services/files.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  files = [];
  private url = 'http://localhost:3000/upload';

  constructor(private fileService: FilesService) {}

  ngOnInit() {
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
