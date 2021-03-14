import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../shared/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
error: boolean = false;
errorMessage: string;

  constructor(public errorService: ErrorService) { }

  ngOnInit(): void {
  }

}
