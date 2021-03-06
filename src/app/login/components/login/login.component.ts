import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserService } from '../../../shared/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  incorrectPassword: boolean;
  submitted: boolean;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = new User();
    this.incorrectPassword = false;
    this.submitted = false;
  }

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    this.signInWithEmail();
  }

  signInWithEmail() {
    if (!this.user.username || !this.user.password) {
      return;
    }
    this.authService
      .signInRegular(this.user.username, this.user.password)
      .then(res => {
        this.userService.save(res.user);
        if (
          this.route.snapshot.queryParams &&
          this.route.snapshot.queryParams.redirectUrl
        ) {
          this.router.navigateByUrl(
            this.route.snapshot.queryParams.redirectUrl
          );
        } else {
          this.router.navigate(['/']);
        }
      })
      .catch(err => {
        const errors = ['auth/user-not-found', 'auth/wrong-password'];
        if (errors.indexOf(err.code) > -1) {
          this.incorrectPassword = true;
        }
      });
  }

  change(e) {}
}
