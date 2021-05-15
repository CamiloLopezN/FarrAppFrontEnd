import {Component, Input, OnInit} from '@angular/core';
import {EstablishmentView} from '../../../model/company';
import {faEdit, faMapMarkerAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {EventEmmiterService} from '../../../services/event-remove.service';
import {IsShowModalService} from '../../../services/is-show-modal.service';

declare var $: any;

@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.css']
})
export class EstablishmentCardComponent implements OnInit {

  @Input() establishment: EstablishmentView;

  faMap = faMapMarkerAlt;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(public router: Router, private ers: EventEmmiterService, private ism: IsShowModalService) {
  }

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.ers.establishmentSelect.next({
      idEstablishment: this.establishment.establishmentId,
      idCompany: this.establishment.companyId,
      name: this.establishment.establishmentName
    });
  }

  redirect(): void {
    $(`#name${this.establishment.establishmentId}`).tooltip('hide');
    this.router.navigate(['company', this.establishment.companyId, 'establishments', this.establishment.establishmentId]);
  }

  edit(event: MouseEvent): void {
    event.stopPropagation();
    try {
      this.ers.establishmentSelect.next({
        idCompany: this.establishment.companyId,
        idEstablishment: this.establishment.establishmentId,
        name: this.establishment.establishmentName
      });
    } catch (error) {
    } finally {
      this.ism.isEstablishment.next(true);
      this.ism.isEstablishmentEdit.next(true);
    }
  }

  remove(mouseEvent: MouseEvent): void {
    mouseEvent.stopPropagation();
    try {
      this.ers.establishmentSelect.next({
        idCompany: this.establishment.companyId,
        idEstablishment: this.establishment.establishmentId,
        name: this.establishment.establishmentName
      });
    } catch (error) {
    } finally {
      $('#removeEstablishment').modal('show');
    }
  }

  hover($event: MouseEvent): void {
    $event.stopPropagation();
  }
}
