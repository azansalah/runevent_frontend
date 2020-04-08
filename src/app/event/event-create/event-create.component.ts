import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as moment from 'moment';


@Component({
    selector: 'event-create',
    templateUrl: './event-create.component.html',
    styleUrls: ['./event-create.component.css']
})

export class EventCreateComponent implements OnInit {
    constructor( 
        private router: Router,
        private http: HttpClient
    ) {}

    public name: any
    public location: any
    public date: any
    public packages: any[]=[]

    ngOnInit() {
        let token = localStorage.getItem('token');
        console.log(token);
        
        if(!token) {
            this.router.navigate(['cms/login']);
        }
    }

    createEvent(){

        this.date=moment();

        let opject = {
            name: this.name,
            location: this.location,
            date: this.date.format('YYYY-MM-DD'),
            packages : this.packages
              
        }
        // console.log(this.location);
        // console.log(this.date);
        // console.log(this.date.format('YYYY-MM-DD'));
        
        this.http.post('http://api-runevent.com/event/add',opject).subscribe(data => {
            
        let result: any
            result = data

            if(result.status == '200') {
                this.router.navigate(['cms/event/list']);
            }else {
    
            }
        
        });

    }

    addPackage() {
        let objPackage = {
            id: null,
            name: '',
            time: '00:00:00',
            price: 0,
            isLimit: false,
            limitCount: null
        }

        this.packages.push(objPackage)  
        
        console.log(this.packages);
        
    }

    deletePackage(index){
        this.packages.splice(index, 1);
    }

}