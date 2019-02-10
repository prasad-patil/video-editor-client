import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login'
  }
];
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginModule {}
