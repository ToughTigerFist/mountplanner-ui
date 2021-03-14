import { Injectable } from "@angular/core";
import { ErrorComponent } from "src/app/error/error.component";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  error: boolean = false;
  errorMessage: string
  constructor() {}

  showError(message: string) {
    this.errorMessage = message;
    this.error = true;
  }

  hideError() {
    this.error = false;
  }
}
