import {Component, Input, OnInit} from '@angular/core';
import {EstablishmentView} from '../../../model/company';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})
export class EstablishmentComponent implements OnInit {

  @Input() establishment: EstablishmentView;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  redirect(): void {
    this.router.navigate(['/company/establishments/', this.establishment._id]);
  }
}
