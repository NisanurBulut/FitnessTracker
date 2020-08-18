import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as: AuthService) {
  }

  ngOnInit() {
  }
  onSubmit(f: NgForm) {
    console.log(f);
    this.as.login({
      email: f.value.email,
      password: f.value.password
    });
  }
}
