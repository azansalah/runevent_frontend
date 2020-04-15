import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';



//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventCreateComponent} from './event/event-create/event-create.component';
import { EventEditComponent} from './event/event-edit/event-edit.component';
import { WebsiteEventListComponent} from './website/event/event-list/website-event-list.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    EventListComponent,
    EventCreateComponent,
    EventEditComponent,
    WebsiteEventListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    //FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: '',
        component: WebsiteEventListComponent
      },
      {
        path: 'cms/login',
        component: LoginComponent
      },
      {
        path: 'cms/event/list',
        component: EventListComponent
      },
      {
        path: 'cms/event/create',
        component: EventCreateComponent
      },
      {
        path: 'cms/event/edit/:id',
        component: EventEditComponent
      }
    ]),
    BrowserAnimationsModule,
    TimepickerModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
