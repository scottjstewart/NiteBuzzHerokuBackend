import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BuzzesService } from 'src/app/shared/services/data.buzzes.service';
import { DataCommentService } from 'src/app/shared/services/data.comment.service';


@Component({
  selector: "app-comment.dialog",
  templateUrl: "./comment.dialog.component.html",
  styleUrls: ["./comment.dialog.component.css"]
})
export class CommentDialogComponent implements OnInit {
  id: number;
  title: string;
  form: FormGroup;
  original: string;
  update: boolean = false
  old: string

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<CommentDialogComponent>,
    private Buzz: BuzzesService,
    private comment: DataCommentService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.id = data.id;
    this.title = data.title;
    this.original = data.original;
    data.update ? this.update = data.update : this.update = false
    data.old ? this.old = data.old : this.old = ''
  }

  ngOnInit() {
    this.form = this.fb.group({
      comment: new FormControl(),
      id: new FormControl()
    });
  }

  submit() {
    this.comment
      .addComment(this.form.controls.comment.value, this.id)
      .subscribe(
        ret => {
          return this.ref.close(ret)
        }
      );
  }

  close() {
    this.ref.close();
  }

  updateComment() {
    this.comment.updateComment(this.id, this.form.controls.comment.value).subscribe(
      data => {
        return this.ref.close(data)
      }
    )
  }
}
