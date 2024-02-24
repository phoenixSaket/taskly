import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss', './clock.scss']
})
export class CalenderComponent implements OnInit {

  lines: number[] = [];
  days: number[] = [];
  month: string = '';
  year: number = 2024;
  calendar: { date: number, day: number, isPrevious: boolean, shouldHide: boolean }[][] = [];
  today: number = 0;
  isCalendarShowing: boolean = true;
  isAM: boolean = false;

  constructor(public calendarService: CalendarService) {}

  ngOnInit(): void {
    let monthData = this.calendarService.getMonthData();

    this.month = monthData.monthName;
    this.year = new Date().getFullYear();
    this.today = new Date().getDate();

    this.calendar = this.calendarService.assignDaystoDate();
    this.getClock();
  }

  showCalendar() {
    this.isCalendarShowing = !this.isCalendarShowing;
  }

  getClock() {
    this.isAM = new Date().getHours() < 12;
    const digit = document.getElementsByClassName("digit");

    function flipTo(digit: HTMLElement, n: any) {
      var current = digit.getAttribute('data-num');
      digit.setAttribute('data-num', n);
      digit.querySelector('.front')?.setAttribute('data-content', current || '');
      digit.querySelector('.back, .under')?.setAttribute('data-content', n);
      let x: any = digit.querySelector('.flap');
      if(x != null) {
        let y: HTMLElement = x;
        y.style.display = 'block';
      }
      setTimeout(function () {
        let x = digit.querySelector('.base');
        if(x != null) {
          x.innerHTML = n;
        }
        let y: any = digit.querySelector('.flap');
        if(y != null) {
          let z: HTMLElement = y;
          z.style.display = 'none';
        }
      }, 350);
    }

    function jumpTo(digit: HTMLElement, n: number) {
      digit.setAttribute('data-num', n.toString());
      let x = digit.querySelector('.base');
      if(x != null) {
        x.innerHTML = n.toString();
      }
    }

    function updateGroup(group: string, n: any, flip: boolean) {
      var digit1 = <HTMLElement>(document.querySelector('.ten' + group));
      var digit2 = <HTMLElement>document.querySelector('.' + group);
      if(digit1 != null && digit2 != null) {
        n = String(n);
        if (n.length == 1) n = '0' + n;
        var num1 = n.substr(0, 1);
        var num2 = n.substr(1, 1);
        if (digit1.getAttribute('data-num') != num1) {
          if (flip) flipTo(digit1, num1);
          else jumpTo(digit1, num1);
        }
        if (digit2.getAttribute('data-num') != num2) {
          if (flip) flipTo(digit2, num2);
          else jumpTo(digit2, num2);
        }
      }
    }

    function setTime(flip: boolean) {
      var t = new Date();
      updateGroup('hour', t.getHours() % 12, flip);
      updateGroup('min', t.getMinutes(), flip);
      updateGroup('sec', t.getSeconds(), flip);
    }

    setTime(false);
    setInterval(function () {
      setTime(true);
    }, 1000);

  }

}
