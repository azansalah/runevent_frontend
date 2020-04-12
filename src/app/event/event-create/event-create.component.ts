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
    public time: any
    public packages: any[]=[]

    ngOnInit() {
        let token = localStorage.getItem('token');        
        if(!token) {
            this.router.navigate(['cms/login']);
        }
    }

    createEvent(){        
        let packages = this.packages.map(val =>({
            name: val.name,
            date: moment(val.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            time: val.time,
            price: val.price,
            isLimit: val.isLimit,
            limitCount: val.limitCount
        }));

        let opject = {
            name: this.name,
            location: this.location,
            packages : packages
              
        }
        
        
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

        let date=moment();

        let objPackage = {
            id: null,
            name: '',
            date: '',
            time: '00:00',
            price: '',
            isLimit: false,
            limitCount: null
        }

        this.packages.push(objPackage)

    }

    deletePackage(index){
        this.packages.splice(index, 1);
    }

}