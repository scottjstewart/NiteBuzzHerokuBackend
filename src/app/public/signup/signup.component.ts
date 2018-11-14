import { Component, OnInit } from "@angular/core";
import { UserService } from '../../shared/services/data.user.service';
import { User } from "../../shared/models/user.model";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  log: any;
  buildUser: FormGroup;

  constructor(
    private user: UserService,
    private fb: FormBuilder,
    private router: Router,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildUser = this.fb.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      userName: new FormControl(),
      password: new FormControl()
    });
  }

  makeUser(): void {
    let user: User = this.buildUser.value
    this.user.makeUser(user).subscribe(
      res => {
        if (res.auth === true) {
          this.log = res
          this.snack.open("Login Successful", "OK", { duration: 1800 })
          this.router.navigate(['about'])
        };
      })
  }
}
