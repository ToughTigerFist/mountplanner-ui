import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { BnetService } from "../shared/services/bnet.service";
import { DataService } from "../shared/services/data.service";
import { ErrorService } from "../shared/services/error.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userName: string;
  slugServerName: string;
  serverList: any;
  serversArray: String[] = [];

  constructor(private router: Router, private bnet: BnetService) {}

  ngOnInit() {
    this.initializePage()
  }

  initializePage() {
    this.getServerList();
  }

  getServerList() {
    this.bnet.getServerList().subscribe((res) => {
      this.serverList = res;
      this.serverList.forEach((server) => {
        this.serversArray.push(server.name);
      });
    });
  }

  goToResults() {
    this.router.navigate([`/results/${this.userName}/${this.slugServerName}`])
  }

  getSlugName(event) {
    if (event) {
      this.serverList.filter((server) =>
        server.name == event ? (this.slugServerName = server.slug) : ""
      );
    }
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.serversArray
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  formatter = (x: { name: string }) => x.name;

}
