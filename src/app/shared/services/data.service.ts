import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private mountData = new BehaviorSubject({});
  currentData = this.mountData.asObservable();

  constructor() {}

  changeData(mounts: any) {
    this.mountData.next(mounts);
  }
}
