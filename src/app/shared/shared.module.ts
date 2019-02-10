import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    HttpClientModule,
    MDBBootstrapModule
  ],
  exports: [FormsModule, NgbModule, FileUploadModule, MDBBootstrapModule],
  providers: [AuthGuard, AuthService, UserService]
})
export class SharedModule {}
