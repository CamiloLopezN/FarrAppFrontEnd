import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faMinus} from '@fortawesome/free-solid-svg-icons';
import {CodePromotional, Status} from '../../../model/company';

@Component({
  selector: 'app-code-promotional-card',
  templateUrl: './code-promotional-card.component.html',
  styleUrls: ['./code-promotional-card.component.css']
})
export class CodePromotionalCardComponent implements OnInit {
  price: any;
  quantity: any;
  typeDescount: Status[];
  faMinus = faMinus;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onDelete: EventEmitter<any> = new EventEmitter();
  @Input() codeP: CodePromotional;

  constructor() {
    this.typeDescount = [
      {name: 'Porcentaje', isSelect: false},
      {name: 'Efectivo', isSelect: false},
    ];
  }

  ngOnInit(): void {
  }

  changeButton2(stat1: Status): void {
    stat1.isSelect = true;
    if (stat1.isSelect) {
      document.getElementById(stat1.name).style.background = 'black';
      document.getElementById(stat1.name).style.color = 'white';
    } else {
      document.getElementById(stat1.name).style.background = '#fafafa';
      document.getElementById(stat1.name).style.color = '#c2c5c8';
    }
    for (const stat of this.typeDescount) {
      if (stat.name !== stat1.name) {
        stat.isSelect = false;
        document.getElementById(stat.name).style.background = '#fafafa';
        document.getElementById(stat.name).style.color = '#c2c5c8';
      }
    }
  }

  onSubmit(): void {

  }

  deleted(): void {
    this.onDelete.emit();
  }
}
