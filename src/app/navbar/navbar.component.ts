import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
    constructor(
        private router: Router
    ) {}

    public show: any
    
    ngOnInit() {

        if(localStorage.getItem('token')){
            this.show = true
        }else{
            this.show = false
        }
    console.log(this.show);
       
    }

    signOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('username'); 
        this.router.navigate(['cms/login']);   
    }

  
}
