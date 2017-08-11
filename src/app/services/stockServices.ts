import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/timer';

@Injectable()
export class StockService {
  private subject = new Subject();
  private timer = Observable.timer(1000, 1000);
  private unsubscribeList = [];
  constructor() { }

  public subscribe(symbol: string): void {
    this.timer.subscribe(() => {
      if (this.unsubscribeList.indexOf(symbol) >= 0) {
        return;
      }

      let bid = (Math.floor(Math.random() * 30) + 1);
      let ask = (Math.floor(Math.random() * 30) + 1);
      let change = bid - ask;
      this.subject.next({ symbol, bid, ask, change });
    });
  }

  public onchange(): Observable<any> {
    return this.subject.asObservable();
  }

  public unsubscribe(symbol: string): void {
    this.unsubscribeList.push(symbol);
    console.log(this.unsubscribeList);
  }
}
