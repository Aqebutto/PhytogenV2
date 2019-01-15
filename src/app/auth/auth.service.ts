import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable, OnInit } from '@angular/core';
// allows other services be injected into this one
@Injectable()
export class AuthService implements OnInit {
  token: string;
  loggedIn = false;

  // constructor(private router: Router) {}

  ngOnInit() {
  }
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          // this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
            console.log(this.token);
        }
      )
      .catch(
        error => console.log(error)
      );
  }
  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }
  // isAuthenticated() {
  //   const promise = new Promise(
  //     (resolve, reject) => {
  //       setTimeout(() => {
  //         resolve(this.loggedIn);
  //       }, 800);
  //     }
  //   );
  //   return promise;
  // }

  isAuthenticated() {
    return this.token != null;
  }
}
