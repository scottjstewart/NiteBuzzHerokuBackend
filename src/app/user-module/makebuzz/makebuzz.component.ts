import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthUserService } from 'src/app/shared/services/data.auth-user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BuzzesService } from 'src/app/shared/services/data.buzzes.service';
import { Buzz } from 'src/app/shared/models/buzz.model';
import { LocationService } from 'src/app/shared/services/data.location.service';


@Component({
  selector: 'app-makebuzz',
  templateUrl: './makebuzz.component.html',
  styleUrls: ['./makebuzz.component.css']
})
export class MakebuzzComponent implements OnInit {
  user
  form: FormGroup
  loc
  update: boolean = false
  title
  location
  category
  price
  funFactor
  details
  id

  constructor(
    private Buzz: BuzzesService,
    private fb: FormBuilder,
    private auth: AuthUserService,
    private ref: MatDialogRef<MakebuzzComponent>,
    private geo: LocationService,

    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data) {
      data.update ? this.update = data.update : this.update = false
      if (data.buzz) {
        this.title = data.buzz.title
        this.location = data.buzz.location
        this.category = data.buzz.category
        this.price = data.buzz.price
        this.funFactor = data.buzz.funFactor
        this.details = data.buzz.details
        this.id = data.buzz.id
      }
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: new FormControl,
      location: new FormControl,
      price: new FormControl,
      funFactor: new FormControl,
      details: new FormControl,
      category: new FormControl
    })
    this.geo.getLocation().subscribe(
      res => {
        this.loc = res
      }

    )
  }

  submit() {
    let buzz: Buzz = this.form.value
    buzz.longitude = this.loc.coords.longitude
    buzz.latitude = this.loc.coords.latitude

    this.Buzz.makeBuzz(buzz).subscribe()
    this.ref.close(this.form.value)
  }

  close() {
    this.ref.close()
  }

  updateBuzz() {
    let buzz: Buzz = this.form.value
    let buzz2: Buzz = {
      id: this.id,
      title: buzz.title !== null || '' || undefined ? buzz.title : this.title,
      category: buzz.category !== null || '' || undefined ? buzz.category : this.category,
      details: buzz.details !== null || '' || undefined ? buzz.details : this.details,
      funFactor: buzz.funFactor !== null || '' || undefined ? buzz.funFactor : this.funFactor,
      location: buzz.location !== null || '' || undefined ? buzz.location : this.location,
      price: buzz.price !== null || '' || undefined ? buzz.price : this.price,
      longitude: null,
      latitude: null
    }

    console.log(buzz)
    console.log(buzz2)
    this.Buzz.updateBuzz(buzz2).subscribe(
      res => {
        return this.ref.close(res)
      }
    )
  }

}
