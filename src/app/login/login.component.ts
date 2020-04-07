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

    public result: string[]
    public object: any
    public username: any
    public password: any
    public status: any

    ngOnInit() {

    }

    login() {
        this.object = {
            username: this.username,
            password: this.password
        }
        
        this.http.post('http://api-runevent.com/auth/login', this.object).subscribe(data => {
            this.result = data['data']
            this.status = data['status']    

            if(this.status == '200') {
                localStorage.setItem('username', this.username);
                localStorage.setItem('token', this.result['result']['token']);
                this.router.navigate(['eventlist']);
            }else {
    
            }
        });
    }
}