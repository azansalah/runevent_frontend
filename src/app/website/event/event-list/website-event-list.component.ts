import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
    selector: 'website-event-list',
    templateUrl: './website-event-list.component.html',
    styleUrls: ['./website-event-list.component.css']
})

export class WebsiteEventListComponent {

    isCollapsed = true;
    

    constructor(
        private http: HttpClient,
        private router: Router   
    ) {}

    public site = 'website'
    public events: any = []

    ngOnInit() {
       this.getEvent()
    }
    
    getEvent() {        
        this.http.get('http://api-runevent.com/website/geteventlist').subscribe(data => {
               
            let result: any
            result = data

            if(result.status == '200') {
                let events = result.data.result

                this.events = events.map(val => ({
                    id: val.id,
                    name: val.name,
                    location: val.location,
                    packages: val.packages,
                    isCollapsed: true
                }));
                console.log(this.events);
                
            }else {
                this.events = []
            }
        });
    }
}