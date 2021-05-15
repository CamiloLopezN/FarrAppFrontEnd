import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {EstablishmentView} from '../../../model/company';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-establishments-company',
  templateUrl: './establishments-company.component.html',
  styleUrls: ['./establishments-company.component.css']
})
export class EstablishmentsCompanyComponent implements OnInit {

  @Input() establishments: EstablishmentView[];
  @Input() typeEstablishment: string;
  @Input() tittle: string;
  @Input() index: string;
  @Input() hasShowMore: boolean;

  faChevronRight = faChevronRight;

  constructor(private cdr: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.cdr.detectChanges();
    document.querySelectorAll('.carousel-mine').forEach(() => {
      $('.carousel-mine').flickity({
        imagesLoaded: true,
        groupCells: true,
        pageDots: false
      });
    });
  }

  redirect(): void {
    $('#showMore2').tooltip('hide');
    this.router.navigate(['users/establishments']);
  }
}
