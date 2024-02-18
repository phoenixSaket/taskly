import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private showLoaderSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public showLoader() {
    this.showLoaderSub.next(true);
  }

  public hideLoader() {
    this.showLoaderSub.next(false);
  }

  public shouldShowLoader(): Observable<boolean> {
    return this.showLoaderSub;
  }
}
