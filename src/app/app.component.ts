import { Component } from "@angular/core";
import { BnetService } from "./shared/services/bnet.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "mountplanner";
  appRunning: boolean;
  outageMessage: string = "";
  constructor(private bnet: BnetService) {}

  ngOnInit() {
    this.bnet.getAppStatus().subscribe(
      (res) => {
        if (res.status === 200) {
          this.appRunning = true;
        }
      },
      (err) => {
        this.appRunning = false;
        this.outageMessage = err.error;
      }
    );
  }
}
