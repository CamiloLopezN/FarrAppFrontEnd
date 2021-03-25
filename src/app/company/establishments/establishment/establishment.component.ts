import {Component, Input, OnInit} from '@angular/core';
import {EstablishmentView} from '../../../model/company';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})
export class EstablishmentComponent implements OnInit {

  @Input() establishment: EstablishmentView;

  constructor() {
  }

  ngOnInit(): void {
  }

}
