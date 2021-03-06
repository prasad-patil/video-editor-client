import { UserService } from './../../../shared/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../shared/services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
