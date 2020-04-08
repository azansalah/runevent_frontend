import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    constructor(
        private http: HttpClient,
        private router: Router   
    ) {}

    public username: any
    public password: any
    public status: any

    ngOnInit() {

    }

    login() {

        let object = {
            username: this.username,
            password: this.password
        }
        
        this.http.post('http://api-runevent.com/auth/login', object).subscribe(data => {
               
            let result: any
            result = data

            if(result.status == '200') {
                localStorage.setItem('username', this.username);
                localStorage.setItem('token', result.data.result.token);
                this.router.navigate(['cms/event/list']);
            }else {
    
            }
        });
    }
}