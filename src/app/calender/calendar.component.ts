import { Component, OnInit } from '@angular/core';

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
  calender: { date: number, day: number, isPrevious: boolean, shouldHide: boolean }[][] = [];
  today: number = 0;
  isCalendarShowing: boolean = false;

  ngOnInit(): void {
    let monthData = this.getMonthData();

    this.month = monthData.monthName;
    this.year = new Date().getFullYear();
    this.today = new Date().getDate();

    this.assignDaystoDate();
    this.getClock();
  }

  showCalendar() {
    this.isCalendarShowing = !this.isCalendarShowing;
  }

  getClock() {
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
      updateGroup('hour', t.getHours(), flip);
      updateGroup('min', t.getMinutes(), flip);
      updateGroup('sec', t.getSeconds(), flip);
    }

    setTime(false);
    setInterval(function () {
      setTime(true);
    }, 1000);

  }

  getMonthData(): { monthName: string, month: number, monthDays: number } {
    let month: number = new Date().getMonth();
    let monthName: string = '';
    let monthDays: number = 0;
    let isLeapYear: boolean = new Date().getFullYear() % 4 == 0;

    switch (month) {
      case 0: monthName = 'January'; monthDays = 31; break;
      case 1: monthName = 'February'; monthDays = isLeapYear ? 29 : 38; break;
      case 2: monthName = 'March'; monthDays = 31; break;
      case 3: monthName = 'April'; monthDays = 30; break;
      case 4: monthName = 'May'; monthDays = 31; break;
      case 5: monthName = 'June'; monthDays = 30; break;
      case 6: monthName = 'July'; monthDays = 31; break;
      case 7: monthName = 'August'; monthDays = 31; break;
      case 8: monthName = 'September'; monthDays = 30; break;
      case 9: monthName = 'October'; monthDays = 31; break;
      case 10: monthName = 'November'; monthDays = 30; break;
      case 11: monthName = 'December'; monthDays = 31; break;
      default: break;
    }

    return { monthName: monthName, month: month, monthDays: monthDays };
  }

  assignDaystoDate() {
    let monthData: { date: number, day: number, isPrevious: boolean, shouldHide: boolean }[] = [];

    let today = new Date().getDay();
    let currentDate = new Date().getDate();

    let daysInMonth = this.getMonthData().monthDays;

    let previousDay: number = 0;
    // setting days till today from start of the month
    for (let i = currentDate; i >= 1; i--) {
      if (monthData.length == 0) {
        monthData.push({
          date: i, day: today + 1,
          isPrevious: true,
          shouldHide: false
        });
        previousDay = today + 1;
      } else {
        let day: number = previousDay - 1;
        monthData.push({
          date: i, day: day == 0 ? 7 : day,
          isPrevious: true,
          shouldHide: false
        });
        previousDay = day == 0 ? 7 : day;
      }
    }

    // sorting date to start from 1st of month
    monthData.sort((a, b) => { return a.date - b.date });
    previousDay += 1;

    // setting days from today till end of the month
    for (let i = monthData[monthData.length - 1].date + 1; i <= daysInMonth; i++) {
      let day: number = previousDay + 1;
      monthData.push({
        date: i, day: day == 8 ? 1 : day,
        isPrevious: false,
        shouldHide: false
      });
      previousDay = day == 8 ? 1 : day;
    }

    // setting object for rendering month
    let monthToRender: any[] = [];

    let line: any[] = [];
    let hasPushedStartingDays: boolean = false;
    monthData.forEach((date: any, index) => {
      if (date.day == 7) {
        if (line.length > 0) {
          line.push(date);
          monthToRender.push(line);
        }
        line = [];
      } else {
        if (line.length < 7 && !hasPushedStartingDays) {
          for (let i = date.day - 1; i <= 7; i++) {
            line.push({ date: 0, day: 0 })
          }
          hasPushedStartingDays = true;
        }
        line.push(date);
      }

      if (index == monthData.length - 1) {
        monthToRender.push(line);
        for (let i = date.day; i < 7; i++) {
          line.push({ date: 0, day: 0 })
        }
      }
    });

    this.calender = monthToRender;
  }

}
