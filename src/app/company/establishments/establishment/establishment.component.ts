import {Component, Input, OnInit} from '@angular/core';
import {Establishment} from '../../../model/company';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})
export class EstablishmentComponent implements OnInit {

  @Input() establishment: Establishment;

  constructor() {
  }

  ngOnInit(): void {
  }

}
