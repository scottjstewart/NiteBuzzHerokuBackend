import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthUserService } from '../../shared/services/data.auth-user.service';
import { User } from '../../shared/models/user.model';
import { BuzzesService } from '../../shared/services/data.buzzes.service';
import { AdminService } from '../services/data.admin.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    users
    form: FormGroup

    constructor(
        private auth: AuthUserService,
        private fb: FormBuilder,
        private buzz: BuzzesService,
        private admin: AdminService,

    ) { }

    ngOnInit() {
        this.admin.adminGetUsers(25, 1).subscribe(admin => {
            this.users = admin;
        })

    }


}
