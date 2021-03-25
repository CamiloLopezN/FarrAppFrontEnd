import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {EstablishmentView} from '../../../model/company';

declare var $: any;

@Component({
  selector: 'app-establishments-company',
  templateUrl: './establishments-company.component.html',
  styleUrls: ['./establishments-company.component.css']
})
export class EstablishmentsCompanyComponent implements OnInit {

  @Input() establishments: EstablishmentView[];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
    document.querySelectorAll('.carousel-mine').forEach(() => {
      $('.carousel-mine').flickity({
        imagesLoaded: true,
        groupCells: true,
        pageDots: false
      });
    });
  }

}
