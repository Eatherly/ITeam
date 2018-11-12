import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
    selector: 'timer',
    template: `
      <div class="container">
        <h1>
            {{hoursHTML ? hoursHTML : '00'}} : {{(minutesHTML) && (minutesHTML <= 59) ? minutesHTML : '00'}} : {{(secondsHTML) && (secondsHTML <= 59) ? secondsHTML : '00'}} <br/>
        </h1>
        <button class="btn {{startStopClass}} controlBtn"  (click)="start_stop()">{{startStop}}</button>
        <button class="btn btn-danger controlBtn" (click)="reset()">Reset</button>
        <button class="btn btn-warning controlBtn" (click)="wait()">Wait</button>
      </div>
    `,
    styles: [ `
            .container{
               height:1000px;
               margin-top: 150px;
               text-align: center;
               font-size: 64px;
            }
            h1 {
                color: coral;
                text-align: center; 
                font-size: 64px;
            }
            .controlBtn{
                width:100px;
                margin-right:10px;
            }
    `]
})
export class AppComponent implements OnInit {
    
    startStop:string="Start";
    tiks:number;
    waitTiks:number=0;
    secondsHTML: number = 0;
    minutesHTML: number = 0;
    hoursHTML: number = 0;
    interval:number;
    sub: Subscription;
    sub2: Subscription;
    clickWaitCount:number=0;
    increment=0;
    startStopClass:string="btn-success";
    
    ngOnInit(){
        this.tiks = 0;
    }
    
    private start_stop(){
        this.startStop=="Start" ? this.start() : this.stop();
        this.startStop=="Start" ? this.startStop="Stop" : this.startStop="Start";
        this.startStop=="Start" ? this.startStopClass="btn-success" : this.startStopClass="btn-info";
    }
    
    private start() {
        let timerStart = timer(1, 1000);
        this.sub = timerStart.subscribe(
            (t:number) => {
            this.getTiks(t)
            }
        )  
    }
    
    private stop() {
         this.sub.unsubscribe();
         this.waitTiks=this.tiks;
    }
    
    
    private reset(){
        this.startStop="Start";
        this.secondsHTML=0;
        this.hoursHTML = 0;
        this.minutesHTML = 0;
        this.tiks=0;
        this.waitTiks=0;
        this.sub.unsubscribe();
    }
    
    
     private wait(){
          
        if (this.startStop=="Stop"){
            this.clickWaitCount++;
            let timerWait = timer(300);
            if(this.clickWaitCount==2){ this.start_stop() ; this.sub2.unsubscribe(); this.clickWaitCount=0;}
            else {
                this.sub2 = timerWait.subscribe(
                    (t:number) => {
                    this.clickWaitCount=0;
                    }
                )
            }
        }
     }
    
    private getTiks(t:number){
                    this.tiks=t+this.waitTiks+this.increment;
                    this.secondsHTML = this.getSeconds(this.tiks);
                    this.minutesHTML = this.getMinutes(this.tiks);
                    this.hoursHTML = this.getHours(this.tiks);
                    this.clickWaitCount=0;
                    this.increment=0;
    }
   

    private getSeconds(tiks: number) {
        return this.pad(tiks % 60);
    }

    private getMinutes(tiks: number) {
         return this.pad((Math.floor(tiks / 60)) % 60);
    }

    private getHours(tiks: number) {
        return this.pad(Math.floor((tiks / 60) / 60));
    }

    private pad(digit: any) { 
        return digit <= 9 ? '0' + digit : digit;
    }
}