import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.css']
})
export class CreateEventModalComponent implements OnInit {

  nameEvent: string;
  dateInit: string;
  dateInitHour: string;
  dateFin: string;
  dateFinHour: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }
}
