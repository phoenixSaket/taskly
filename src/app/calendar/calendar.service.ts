import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  currentMonthData: any[] = [];
  selectedDate: number = -1;

  constructor() { }

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
    console.log("month data", monthData);
    previousDay += 1;

    // setting days from today till end of the month
    for (let i = monthData[monthData.length - 1].date + 1; i <= daysInMonth; i++) {
      let day: number = monthData[monthData.length - 1].day + 1;
      monthData.push({
        date: i, day: day == 8 ? 1 : day,
        isPrevious: false,
        shouldHide: false
      });
      previousDay = day == 8 ? 1 : day;
    }

    this.currentMonthData = monthData;

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

    return monthToRender;
  }
}
