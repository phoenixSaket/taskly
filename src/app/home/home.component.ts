import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar/calendar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isSideOpen: boolean = true;
  today: string = '';
  currentDate: number = 0;
  currentMonthData: any[] = [];
  isBackDisabled: boolean = false;
  isNextDisabled: boolean = false;

  constructor(private calendar: CalendarService) { }

  ngOnInit(): void {
    this.calendar.assignDaystoDate();
    this.currentMonthData = this.calendar.currentMonthData;
    const today = this.currentMonthData.find((el: any) => { return el.date == new Date().getDate() }).day;
    this.getDay(today);
    this.currentDate = new Date().getDate();

    this.checkDates(this.currentDate);
  }

  getDay(today: number) {
    switch (today) {
      case 1: this.today = 'Sunday'; break;
      case 2: this.today = 'Monday'; break;
      case 3: this.today = 'Tuesday'; break;
      case 4: this.today = 'Wednesday'; break;
      case 5: this.today = 'Thursday'; break;
      case 6: this.today = 'Friday'; break;
      case 7: this.today = 'Saturday'; break;
    }
  }

  openSideBar() {
    this.isSideOpen = !this.isSideOpen;
  }

  nextDay() {
    if (!this.isNextDisabled) {
      this.currentDate += 1;
      let today = this.currentMonthData.find((el: any) => { return el.date == this.currentDate });
      this.getDay(today.day);
    }
    this.checkDates(this.currentDate);
  }

  previousDay() {
    if (!this.isBackDisabled) {
      this.currentDate -= 1;
      let today = this.currentMonthData.find((el: any) => { return el.date == this.currentDate });
      this.getDay(today.day);
    }
    this.checkDates(this.currentDate);
  }

  checkDates(date: number) {
    let monthData = this.calendar.getMonthData();
    this.isBackDisabled = date == 1;    
    this.isNextDisabled = date == monthData.monthDays;
    this.calendar.selectedDate = date;
  }
}
