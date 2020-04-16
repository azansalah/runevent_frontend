import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";



@Component({
    selector: 'website-register',
    templateUrl: './website-event-register.component.html',
    styleUrls: ['./website-event-register.component.css']
})

export class WebsiteRegisterComponent implements OnInit {
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
                    this.router.navigate(['']);
                }
            },
            error => {

                let resultError:any
                resultError = error
                console.log(error, 'error');
                
                if(resultError.error.error.code = '01'){
                    alert("คุณได้สมัครแพ็คเกจนี้ไปแล้ว" + resultError.status)
                }  

                if(resultError.error.error.code = '02'){
                    alert("แพ็คเกจนี้เต็มแล้ว" + resultError.status)
                }
            }   
        );
    }
}