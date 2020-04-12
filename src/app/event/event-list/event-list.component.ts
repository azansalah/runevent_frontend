import { Component, OnInit, TemplateRef} from '@angular/core';
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

  modalRef: BsModalRef;
  message: string;
  
  public idForDelete: any=null
  public events
 
  openModal(template: TemplateRef<any>,id) {
    this.idForDelete = id
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    
  }
 
  decline(): void {
    this.modalRef.hide();
  }

    constructor( 
        private router: Router,
        private http: HttpClient,
        private modalService: BsModalService
    ) {}
    
    
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