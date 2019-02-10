import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  loggedInUser: Observable<firebase.User>;
  private firebaseUserDetails: firebase.User = null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.loggedInUser = firebaseAuth.authState;

    this.loggedInUser.subscribe(user => {
      if (user) {
        this.firebaseUserDetails = user;
        this.userService.get(user);
      } else {
        this.firebaseUserDetails = null;
      }
    });
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    if (this.firebaseUserDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.firebaseAuth.auth.signOut().then(res => this.router.navigate(['login']));
    this.userService.user = null;
    this.userService.user$ = null;
  }
}
