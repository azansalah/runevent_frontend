import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

    @Input()
    customNavbar : any;
 
    constructor(
        private router: Router
    ) {}

    public show: any
    
    ngOnInit() {
       
    }

    signOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('username'); 
        this.router.navigate(['cms/login']);   
    }

  
}
