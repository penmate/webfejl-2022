import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss']
})
export class SuccessfulComponent implements OnInit {
  date: string = new Date().toDateString();
  
  constructor() { }

  ngOnInit(): void {
  }

}
