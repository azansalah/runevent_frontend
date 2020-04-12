import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router"
import * as moment from 'moment';


@Component({
    selector: 'event-update',
    templateUrl: './event-edit.component.html',
    styleUrls: ['./event-edit.component.css']
})

export class EventEditComponent implements OnInit {
    constructor( 
        private router: Router,
        private http: HttpClient,
        private activatedRoute: ActivatedRoute
    ) {}

    public eventName: any
    public eventLocation: any
    public packages: any = []
    public activatedRouteUrlSubscribe: any
    public id: any

    ngOnInit() {
        let token = localStorage.getItem('token')    
        if(!token) {
            this.router.navigate(['cms/login']);
        }

        this.activatedRouteUrlSubscribe = this.activatedRoute.params.subscribe(
            params => {
                this.id = params.id;
                this.getEventById(this.id);
            }
        );
    }

    ngOnDestroy(): void {
        this.activatedRouteUrlSubscribe.unsubscribe()
    }

    getEventById(id){
        this.http.get('http://api-runevent.com/event/get/' + id).subscribe(data =>{
            let result: any
            result = data
            if(result.status == '200'){
                let event = result.data.result

                this.eventName = event.name
                this.eventLocation = event.location
                this.packages = event.packages.map(val => ({
                    id: val.id,
                    name: val.name,
                    date: moment(val.date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
                    time: moment(val.time, 'HH:mm:ss').format('HH:mm'),
                    price: val.price,
                    isLimit: val.isLimit,
                    limitCount: val.limitCount,
                }));
                
                console.log(this.packages);
                
            }else{

            }
        });
    }

editEvent(){
    console.log(this.packages,'In');
    
    let packages = this.packages.map(val => ({
        id: val.id,
        name: val.name,
        date: moment(val.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        time: val.time,
        price: val.price,
        isLimit: val.isLimit,
        limitCount: val.limitCount,
    }));

    let object = {
        name: this.eventName,
        location: this.eventLocation,
        packages: packages
    }
    console.log(object,'Out');

    this.http.patch('http://api-runevent.com/event/edit/' + this.id, object).subscribe(data => {
        let result: any

        result = data
        if(result.status == '200'){
            this.router.navigate(['cms/event/list']);
        }else{

        }
    });
    }

   
    

    addPackage() {
        let date = moment(new Date()).format('DD-MM-YYYY')
        let objPackage = {
            id: null,
            name: '',
            date: date,
            time: '00:00',
            price: '',
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