import { Component, OnInit, TemplateRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css'],
})

export class EventListComponent implements OnInit {

          
  modalRef: BsModalRef;
  message: string;
  
  public site = 'cms'
  public eventName: any
  public eventLocation: any
  public packages: any = []
  public idForDelete: any=null
  public events

  constructor( 
    private router: Router,
    private http: HttpClient,
    private modalService: BsModalService
) {}
 
  openModal(template: TemplateRef<any>,id) {
    this.idForDelete = id
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  decline(): void {
    this.modalRef.hide();
  }

  modalEventDetail(template: TemplateRef<any>,id) {
    this.http.get('http://api-runevent.com/event/get/'+id).subscribe(data => {
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
             
            this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
        }else{

        }
            
            
        });
    
  }    

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
        }else
            this.events = []
        });

    }

    deleteEvent(){
        let eventList = []
        eventList.push(this.idForDelete);

        let object = {
            eventList: eventList
        }
        
        this.http.patch('http://api-runevent.com/event/delete', object).subscribe(data => {
               
            let result: any
            result = data

            if(result.status == '200') {
                this.idForDelete = null
                this.getEvent()
                this.modalRef.hide();
            }else {
    
            }
        });
    }
}