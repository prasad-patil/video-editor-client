import { AuthUser } from './../../models/auth-user.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: AngularFireObject<AuthUser>;
  user: AuthUser;

  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      userName: user.email,
      displayName: user.displayName
    });
  }

  get(user: firebase.User): AngularFireObject<AuthUser> {
    this.user$ = this.db.object('/users/' + user.uid);
    this.user$.snapshotChanges().subscribe(userInfo => {
      this.user = userInfo.payload.val();
    });
    return this.user$;
  }
}
