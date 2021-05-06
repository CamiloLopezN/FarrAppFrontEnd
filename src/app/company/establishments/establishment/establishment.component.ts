import {Component, Input, OnInit} from '@angular/core';
import {EstablishmentView} from '../../../model/company';
import {Router} from '@angular/router';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {EventEmmiterService} from '../../../services/event-remove.service';
import {IsShowModalService} from '../../../services/is-show-modal.service';

declare var $: any;

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})
export class EstablishmentComponent implements OnInit {

  @Input() establishment: EstablishmentView;

  faTrash = faTrash;
  faEdit = faEdit;

  constructor(public router: Router, private ers: EventEmmiterService, private ism: IsShowModalService) {
  }

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  redirect(): void {
    $(`#title${this.establishment.establishmentId}`, `#city${this.establishment.establishmentId}`).tooltip('hide');
    this.router.navigate(['company', this.establishment.companyId, 'establishments', this.establishment.establishmentId]);
  }

  edit(): void {
    try {
      this.ers.establishmentSelect.next({
        idCompany: this.establishment.companyId,
        idEstablishment: this.establishment.establishmentId,
        name: this.establishment.establishmentName
      });
      this.ism.isEstablishment.next(true);
      this.ism.isEstablishmentEdit.next(true);
    } catch (error) {
      console.error(error);
    } finally {
      $('#register-event-modal').modal('show');
    }
  }

  remove(): void {
    try {
      this.ers.establishmentSelect.next({
        idCompany: this.establishment.companyId,
        idEstablishment: this.establishment.establishmentId,
        name: this.establishment.establishmentName
      });
    } catch (error) {
      console.error(error);
    } finally {
      $('#removeEvent').modal('show');
    }
  }

  hover($event: MouseEvent): void {
    $event.stopPropagation();
  }
}
