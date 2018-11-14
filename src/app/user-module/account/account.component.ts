import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "../../shared/services/data.auth-user.service";
import { BuzzesService } from "../../shared/services/data.buzzes.service";
import { DataCommentService } from "../../shared/services/data.comment.service";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { UpdateUserComponent } from "./update-user/update-user.component";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
  users$;
  username: string;
  password: string;
  comment: any;
  buzzes: any[];
  commentId: any;
  buzz: any;
  loggedIn

  constructor(
    private auth: AuthUserService,
    private data: DataCommentService,
    private buzzs: BuzzesService,
    private dialog: MatDialog
  ) {
    this.buzzs.buzzr$.subscribe(
      res => {
        this.users$.Buzzes.push(res)
      }
    )
  }

  ngOnInit() {
    this.auth.getUser().subscribe(auth => {
      this.users$ = auth;
      this.loggedIn = this.auth.loggedIn()
    });
  }

  delete(): void {
    this.auth.deleteUser(this.username, this.password).subscribe();
  }

  deleteBuzz(id: any): void {
    this.buzzs.deleteBuzz(id).subscribe(succ => {
      this.auth.getUser().subscribe(auth => {
        this.users$ = auth;
      });
    });
  }

  deleteComment(commentId: any): void {
    this.data.deleteComment(commentId).subscribe(succ => {
      this.auth.getUser().subscribe(auth => {
        this.users$ = auth;
      });
    });
  }

  updateUser() {
    const config = new MatDialogConfig();

    config.minHeight = "50vh";

    const dialogRef = this.dialog.open(UpdateUserComponent, config);

    dialogRef.afterClosed().subscribe(data => {
      this.auth.updateUser(data).subscribe(
        res => console.log(res)
      )
    });
  }
}
