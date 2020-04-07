import { Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { events } from '../../events';

@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {
    constructor(
               
        private router: Router
        
    ) {}

    public token: any

    ngOnInit() {
        this.token = JSON.parse(localStorage.getItem('token'));

        if(!this.token) {
            this.router.navigate(['login']);
        }
    }
}