import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CodePromotional, Status} from '../../../model/company';

@Component({
  selector: 'app-register-code',
  templateUrl: './register-code.component.html',
  styleUrls: ['./register-code.component.css']
})
export class RegisterCodeComponent implements OnInit {

  typeDescount: Status[];
  codePromotional: CodePromotional;
  code: string;
  canjVal: number;
  discountType: string;
  discountValue: number;

  messageDisTypeErr: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onAdd: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.typeDescount = [
      {name: 'Porcentaje', isSelect: false},
      {name: 'Efectivo', isSelect: false},
    ];
  }

  ngOnInit(): void {
    document.getElementById('div-apar').scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  onSubmit(): void {
    this.messageDisTypeErr = '';
    if (this.validateDiscountType()) {
      this.messageDisTypeErr = 'Debes seleccionar el tipo de descuento';
    } else {
      this.codePromotional = {
        discountRate: this.discountValue,
        codeString: this.code,
        discountType: this.typeDescount.find(item => item.isSelect === true).name,
        totalValidExchanges: this.canjVal,
        remainingValidExchanges: 0
      };
      this.onAdd.emit(this.codePromotional);
    }
  }


  isVall(): boolean {
    return this.isPercentValidate() && this.isEfectValidate() && this.isCanjVal();

  }

  isPercentValidate(): boolean {
    if (this.getDiscountSelect() === 'Porcentaje') {
      return this.discountValue > 0 && this.discountValue <= 100;
    } else {
      return true;
    }
  }

  isEfectValidate(): boolean {
    if (this.getDiscountSelect() === 'Efectivo') {
      return this.discountValue > 0;
    } else {
      return true;
    }
  }

  getDiscountSelect(): string {
    if (this.typeDescount.find(item => item.isSelect === true) !== undefined) {
      return this.typeDescount.find(item => item.isSelect === true).name;
    } else {
      return '';
    }
  }

  validateDiscountType(): boolean {
    return this.typeDescount.every(item => item.isSelect === false);
  }

  changeButton(stat1: Status): void {
    this.messageDisTypeErr = '';
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

  isCanjVal(): boolean {
    return this.canjVal > 0;
  }
}
