import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css'],
})

export class EventListComponent implements OnInit {

    

    constructor( 
        private router: Router,
        private http: HttpClient
    ) {}

    public events
    //public faCoffee = faCoffee;


    ngOnInit() {

        let token = localStorage.getItem('token');

        if(!token) {
            this.router.navigate(['cms/login']);
        }

        this.getEvent()

    }

    getEvent(){
        this.http.get('http://api-runevent.com/event/get/list').subscribe(data => {
        let result: any
        result = data

        if(result.status == '200'){
             
            this.events = result.data.result  
            console.log(this.events); 
        }else
            this.events = []
        });

    }

    deleteEvent(id){
        let eventList = []
        eventList.push(id);

        let object = {
            eventList: eventList
        }
        console.log(id);
        
        this.http.patch('http://api-runevent.com/event/delete', object).subscribe(data => {
               
            let result: any
            result = data

            if(result.status == '200') {
                this.getEvent()
            }else {
    
            }
        });
    }
}