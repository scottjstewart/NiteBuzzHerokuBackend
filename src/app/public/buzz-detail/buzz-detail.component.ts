import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CommentDialogComponent } from '../../user-module/comment.dialog/comment.dialog.component'
import { BuzzesService } from '../../shared/services/data.buzzes.service';
import { ActivatedRoute } from '@angular/router';
import { DataCommentService } from '../../shared/services/data.comment.service';
import { AuthUserService } from '../../shared/services/data.auth-user.service';


@Component({
  selector: "app-buzz-detail",
  templateUrl: "./buzz-detail.component.html",
  styleUrls: ["./buzz-detail.component.css"]
})
export class BuzzDetailComponent implements OnInit {

  buzz: any;
  loggedIn: boolean;
  userId: string

  constructor(
    private dialog: MatDialog,
    private buzzSvc: BuzzesService,
    private route: ActivatedRoute,
    private auth: AuthUserService,
    private comment: DataCommentService
  ) { }

  ngOnInit() {
    this.loggedIn = this.auth.loggedIn();
    let id = this.route.snapshot.paramMap.get('id')
    this.buzzSvc.getBuzzById(id).subscribe(
      res => {
        this.buzz = res
        console.log(this.buzz)
      }
    )
    this.userId = this.auth.getId()
  }

  openDialog(title, original) {
    const config = new MatDialogConfig();

    config.minHeight = "50vh";
    config.data = {
      id: this.buzz.id,
      title: title,
      original: original
    };

    const dialogRef = this.dialog.open(CommentDialogComponent, config);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data)
        this.buzz.Comments.push(data)
      }
    });
  }

  updateComment(id, original, old, title, dex) {
    const config = new MatDialogConfig();

    config.minHeight = "50vh";
    config.minWidth = "60vw"
    config.data = {
      original: original,
      title: title,
      id: id,
      old: old,
      update: true
    };

    const dialogRef = this.dialog.open(CommentDialogComponent, config);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data)
        this.buzz.Comments[dex] = data
      }
    });
  }

  deleteComment(id, dex) {
    if (window.confirm('Delete comment?')) {
      this.comment.deleteComment(id).subscribe(
        rep => {
          console.log(rep)
          if (rep.status === 200) {
            this.buzz.Comments.splice(dex, 1)
          }
        }
      )
    }
  }

}
