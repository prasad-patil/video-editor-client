import { AuthGuard } from './../shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { UploadDownloadComponent } from './components/upload-download/upload-download.component';
import { VideoFormComponent } from './components/video-form/video-form.component';

const routes: Routes = [
  {
    path: 'videos',
    children: [
      {
        component: DashboardComponent,
        path: '',
        canActivate: [AuthGuard]
      },
      {
        component: VideoFormComponent,
        path: 'add',
        canActivate: [AuthGuard]
      },
      {
        path: 'upload',
        component: UploadDownloadComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    UploadDownloadComponent,
    VideoFormComponent
    // FileSelectDirective,
    // FileDropDirective
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class UploaderModule {}
