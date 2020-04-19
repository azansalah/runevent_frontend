import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import * as Highcharts from 'highcharts';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashBoardComponent implements OnInit {

    public site = 'cms'
    public packagestats: any
    public eventstats: any
    public chartOption: any = {};
    public Highcharts = Highcharts;
    public chart: any
    cb = function (chart) {
        setTimeout(function () {
            chart.reflow();
        }, 0);
        
    };

    constructor(
        private http: HttpClient,
        private router: Router   
    ) {}


    ngOnInit() {

        let token = localStorage.getItem('token');

        if(!token) {
            this.router.navigate(['cms/login']);
        }

        this.getDashBoard()

    }

    getDashBoard(){
        this.http.get('http://api-runevent.com/dashboard').subscribe(data => {
        let result: any
        result = data

        
        if(result.status == '200'){
            console.log(result);
            
            this.packagestats = result.data.result.packageStat  
            this.eventstats = result.data.result.eventStat
            this.chart = result.data.result.chart
            console.log(this.chart);
            console.log(this.eventstats);
            
            this.renderChart(this.chart) 
        }else{

        }
           
        });
        
    }

    renderChart(data: any) {
        this.chartOption = {
          chart: {
            type: 'spline'
          },
          title: {
            text: ''
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: data.dataX
          },
          yAxis: {
            title: {
              text: 'จำนวน'
            },
            labels: ''
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            },
            animation: {
              duration: 1000
            }
          },
          series: [
            {
              name: 'คน',
              data: data.dataY
            }
          ],
          credits: {
            enabled: false
          },
          legend: {
            enabled: false
          }
        };
      }

    
}