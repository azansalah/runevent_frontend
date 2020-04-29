import { Component, OnInit,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { ModalDirective } from 'ngx-bootstrap/modal';



@Component({
    selector: 'website-register',
    templateUrl: './website-event-register.component.html',
    styleUrls: ['./website-event-register.component.css']
})

export class WebsiteRegisterComponent implements OnInit {

    @ViewChild('childModal', { static: false } as any ) childModal: ModalDirective;
   
    constructor(
        private router: Router, 
        private http: HttpClient,
        private activatedRoute: ActivatedRoute
    ) {}

    public site = 'website'
    public id: any
    public activatedRouteUrlSubscribe: any
    public cardNo: any
    public tName:any
    public fName:any
    public lName:any
    public telephone:any
    public email:any
    public message:any

    
 
    showChildModal(code: any){
        if(code == '1'){
            this.message = 'คุณได้มัครแพ็คเก็จนี้ไปแล้ว'
        } else if(code == '2'){
            this.message = 'แพ็คเก็จนี้เต็มแล้ว'
        } else if(code == '3'){
            this.message = 'คุณได้สมัครแพ็คเก็จนี้เรียบร้อยแล้ว'
        }
        this.childModal.show();
    }

    hideChildModal(): void {
        this.childModal.hide();
        this.router.navigate(['']);
    }

    ngOnInit() {
        this.activatedRouteUrlSubscribe = this.activatedRoute.params.subscribe(
            params => {
                this.id = params.id;
            }
        );
        console.log(this.id);
        
    }
    
    
    eventRegister(){        
        
        let object = {
            cardNo: this.cardNo,
            tName: this.tName,
            fName: this.fName,
            lName: this.lName,
            telephone: this.telephone,
            email: this.email   
        }
        
        this.http.post('http://api-runevent.com/website/register/'+ this.id,object).subscribe(
            data => {
            
                let result: any
                result = data

                if(result.status == '200') {
                    this.showChildModal('3');
                }
            },
            error => {

                let resultError:any
                resultError = error
                console.log(error, 'error');
                
                if(resultError.error.error.code = '01'){
                    this.showChildModal('2');
                }  

                if(resultError.error.error.code = '02'){
                    this.showChildModal('1');
                }
            }   
        );
    }
}