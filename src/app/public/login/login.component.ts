import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/data.user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  log: any
  credentials: FormGroup

  constructor(
    private user: UserService,
    private fb: FormBuilder,
    private router: Router,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      userName: new FormControl,
      password: new FormControl
    })
  }

  login(): void {
    let cred = this.credentials.controls.userName.value
    let password = this.credentials.controls.password.value

    this.user.login(cred, password).subscribe(
      res => {
        if (res.auth === true) {
          this.log = res
          this.snack.open("Login Successful", "OK", { duration: 1800 })
          this.router.navigate(['about'])
        }
      }
    )
  }

}
