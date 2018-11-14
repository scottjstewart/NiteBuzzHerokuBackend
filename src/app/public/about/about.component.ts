import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { CommentDialogComponent } from '../../user-module/comment.dialog/comment.dialog.component';
import { AuthUserService } from '../../shared/services/data.auth-user.service'
import { BuzzesService } from '../../shared/services/data.buzzes.service'
import { LocationService } from "../../shared/services/data.location.service";
import { Buzz } from '../../shared/models/buzz.model'
import { UpvoteService } from "../../user-module/data.upvote.service";
import { DataCommentService } from "../../shared/services/data.comment.service";
import { MakebuzzComponent } from "../../user-module/makebuzz/makebuzz.component";


@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  picture = "./assetsabout/facebook_profile_image.png";
  buzzes$
  loggedIn: boolean;
  loc: any;
  userId
  progress: []
  constructor(
    private dialog: MatDialog,
    private auth: AuthUserService,
    private geo: LocationService,
    private data: BuzzesService,
    private upvote: UpvoteService,
    private snackbar: MatSnackBar,
    private comment: DataCommentService,
  ) {
    data.buzzr$.subscribe(
      res => {
        this.buzzes$.push(res)
      }
    )
  }

  ngOnInit() {
    this.loggedIn = this.auth.loggedIn();
    this.loc = this.geo.getLocation()
    this.data.getBuzzes().subscribe(
      data => {
        this.buzzes$ = data
        console.log(this.buzzes$)
      }
    )
    this.userId = this.auth.getId()
    console.log(this.userId)
  }

  openDialog(title: string, original: string, id: string | number, index: number) {
    const config = new MatDialogConfig();

    config.minHeight = "50vh";
    config.data = {
      title: title,
      original: original,
      id: id
    };

    // this.dialog.open(CommentDialogComponent, config)
    const dialogRef = this.dialog.open(CommentDialogComponent, config);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.buzzes$[index].Comments.push(data)
      }
    });
  }

  plusOne(id: string, index) {
    this.upvote.plusOne(id).subscribe(
      res => {
        console.log(res)
        if (res.status === 200) {
          console.log(res)
          this.snackbar.open(res.message, "Ok", { duration: 3000 })
          this.buzzes$[index].upVote = res.votes
        } else if (res.status === 201) {
          this.snackbar.open(res.message, "Ok", { duration: 3000 })
        }
      }
    )
  }

  deleteComment(id, index, dex) {
    if (window.confirm('Delete comment?')) {
      this.comment.deleteComment(id).subscribe(
        rep => {
          console.log(rep)
          if (rep.status === 200) {
            this.buzzes$[index].Comments.splice(dex, 1)
          }
        }
      )
    }
  }

  deleteBuzz(id, title, index) {
    if (window.confirm(`Delete buzz: ${title}`)) {
      this.data.deleteBuzz(id).subscribe(
        rep => {
          this.buzzes$.splice(index, 1)
        }
      )
    }
  }

  updateComment(id, original, old, title, index, dex) {
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
        this.buzzes$[index].Comments[dex] = data
      }
    });
  }

  updateBuzz(buzz: Buzz, index) {
    const config = new MatDialogConfig();

    config.minHeight = "50vh";
    config.data = {
      update: true,
      buzz: buzz
    };

    // this.dialog.open(CommentDialogComponent, config)
    const dialogRef = this.dialog.open(MakebuzzComponent, config);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log('data', data)
        this.buzzes$[index] = data
      }
    });
  }
}
