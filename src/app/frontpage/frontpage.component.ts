import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormArray, FormControl, FormGroup, NgForm, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FrontpageComponent implements OnInit {

  signinForm: FormGroup;
  signupForm: FormGroup;
  tab = 1;
  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: '',
      password: null
    });
    this.signupForm = this.fb.group({
      email: '',
      password: null
    });
  }

  onSignup() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.authService.signupUser(email, password);
    this.tab = 2;
  }
  onSignin() {
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this.authService.signinUser(email, password);
  }
  changeTab() {
    if (this.tab === 1) {
      this.tab = 2;
    } else {
      this.tab = 1;
    }
  }

}
