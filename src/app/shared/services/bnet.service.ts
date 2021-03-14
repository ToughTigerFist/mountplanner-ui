import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BnetService {
  constructor(private http: HttpClient) {}

  getMountsForCharacter(charName: string, server: string) {
    return this.http.get(
      `${environment.API_ENDPOINT}mount/${charName}/${server}`
    );
  }

  getCharacterProfile(charName: string, server: string) {
    return this.http.get(
      `${environment.API_ENDPOINT}profile/${charName}/${server}`
    );
  }

  getTotalMountNumber() {
    return this.http.get(`${environment.API_ENDPOINT}mount/total`);
  }

  getServerList() {
    return this.http.get(`${environment.API_ENDPOINT}servers`);
  }

  getAppStatus() {
    return this.http.get(`${environment.API_ENDPOINT}appStatus`, {
      observe: "response",
    });
  }

  getProfileStatus(charName: string, server: string) {
    return this.http.get(
      `${environment.API_ENDPOINT}status/${charName}/${server}`,
      { responseType: "text" }
    );
  }
}
