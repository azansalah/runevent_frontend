import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
    selector: 'website-event-list',
    templateUrl: './website-event-list.component.html',
    styleUrls: ['./website-event-list.component.css']
})

export class WebsiteEventListComponent {

    constructor(
        private http: HttpClient,
        private router: Router   
    ) {}

    public site = 'website'
    public events: any = []

    ngOnInit() {
       
    }
    
    getEvent() {        
        this.http.get('http://api-runevent.com/website/geteventlist').subscribe(data => {
               
            let result: any
            result = data

            if(result.status == '200') {
                
            }else {
    
            }
        });
    }
}