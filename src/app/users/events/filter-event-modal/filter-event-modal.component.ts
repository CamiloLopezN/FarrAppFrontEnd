import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Status} from '../../../model/company';

@Component({
  selector: 'app-filter-event-modal',
  templateUrl: './filter-event-modal.component.html',
  styleUrls: ['./filter-event-modal.component.css']
})
export class FilterEventModalComponent implements OnInit {
  minAge: number;
  listButtons: Status[];
  listButtonsCategory: Status[];
  listButtonsCode: Status[];
  @Input() cities: string[];
  citySelect: string;

  constructor(private dtc: ChangeDetectorRef) {
    this.listButtons = [{
      isSelect: false,
      name: 'Mayor capacidad'
    },
      {
        isSelect: false,
        name: 'Menor capacidad'
      },
      {
        isSelect: true,
        name: 'Popularidad'
      }];
    this.listButtonsCategory = [
      {
        name: 'Abierto',
        isSelect: false
      },
      {
        name: 'Cerrado',
        isSelect: false
      }];
    this.listButtonsCode = [
      {
        name: 'Coctel',
        isSelect: false
      },
      {
        name: 'Informal',
        isSelect: false
      }];
  }

  ngOnInit(): void {
    this.dtc.detectChanges();
    const btnDoc = document.getElementById('Popularidad');
    btnDoc.style.background = 'rgba(255, 26, 67, 0.8)';
    btnDoc.style.color = '#FAFAFA';
  }

  changeBtnFilter(option: Status): void {
    option.isSelect = true;
    this.changeColorEnabled(option);
    this.listButtons.forEach(opt => {
      if (opt !== option) {
        opt.isSelect = false;
        this.changeColorDisable(opt);
      }
    });
  }

  changeColorDisable(option: Status): void {
    document.getElementById(option.name).style.background = 'rgba(37, 36, 39, 0.8)';
    document.getElementById(option.name).style.color = '#FFFFFF';
  }

  changeColorEnabled(option: Status): void {
    document.getElementById(option.name).style.background = 'rgba(255, 26, 67, 0.8)';
    document.getElementById(option.name).style.color = 'white';
  }

  changeBtnList(btnCode: Status): void {
    btnCode.isSelect = !btnCode.isSelect;
    const btnDoc = document.getElementById(btnCode.name);

    if (btnCode.isSelect) {
      btnDoc.style.background = 'rgba(37, 36, 39, 0.8)';
      btnDoc.style.color = '#FFFFFF';
    } else {
      btnDoc.style.background = '#FAFAFA';
      btnDoc.style.color = 'rgba(37, 36, 39, 0.5)';
    }
  }
}
