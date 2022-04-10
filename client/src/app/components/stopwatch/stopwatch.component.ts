import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {

  public d: number;
  public ss: number;
  public mm: number;

  public tempsInterval!: any;
  public minutes! : string;
  public seconds! : string;

  constructor() {
    this.d = 99;
    this.ss = 0;
    this.mm = 5;
  }

  ngOnInit(): void {
    this.tempsCrono();
    this.tempsInterval = setInterval(() => {
      this.tempsCrono();
    }, 10);

  }

  tempsCrono() {
    this.d--;

    if (this.d <= -1) { this.ss--; this.d = 99; }
    if (this.ss <= -1) { this.mm--; this.ss = 59; }
    if (this.mm <= -1) this.mm = 59;

    this.seconds = ('0' + this.ss).slice(-2);
    this.minutes = ('0' + this.mm).slice(-2);

    if (`${this.minutes}:${this.seconds}` == "00:00") {
      clearInterval(this.tempsInterval);
    }
  }

}
