import { Component, OnInit } from "@angular/core";
import { BnetService } from "../shared/services/bnet.service";
import { ActivatedRoute } from "@angular/router";
import { ErrorService } from "../shared/services/error.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnInit {
  mountsCollected: any;
  totalMounts: number;
  router: any;
  serverList: any;
  serversArray: String[] = [];
  userName: string;
  slugServerName: string;
  profileValid: boolean;
  profile: any;
  collectedPct: number;

  constructor(
    private bnet: BnetService,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userName = params.get("user");
      this.slugServerName = params.get("server");
    });
    this.initializePage();
  }

  initializePage() {
    this.getProfileStatus();
    this.getTotalMounts();
  }

  getProfileStatus() {
    this.bnet.getProfileStatus(this.userName, this.slugServerName).subscribe(
      (res) => {
        if (res.toLowerCase() == "true") {
          this.getCharacterProfile();
        }
      },
      (err) => {
        console.log(err);
        this.errorService.showError(err.error);
      }
    );
  }

  getCharacterProfile() {
    this.bnet
      .getCharacterProfile(this.userName, this.slugServerName)
      .subscribe((res) => {
        console.log(res);
        this.profile = res;
        this.calculatePercents();
      });
  }

  calculatePercents() {
    this.collectedPct = Math.round(
      Math.max((this.profile.mounts.length / this.totalMounts) * 100, 1)
    );
  }

  getTotalMounts() {
    this.bnet.getTotalMountNumber().subscribe((res) => {
      this.totalMounts = res["total"];
    });
  }

  getMountsForCharacter() {
    this.bnet
      .getMountsForCharacter(this.userName, this.slugServerName)
      .subscribe(
        (res) => {
          this.mountsCollected = res;
        },
        (err) => {
          this.errorService.showError(err.error);
        }
      );
  }

  getWowheadId(mount) {
    return "mount=" + mount.id
  }

  onFocus() {
    this.errorService.hideError();
  }
}
