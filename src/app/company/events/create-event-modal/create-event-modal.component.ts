import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
  EstablishmentViewId,
  EventC,
  EventRegister,
  Img, RemoveEvent,
  Status,
  Ticket,
} from '../../../model/company';
import {faCalendarAlt, faImages} from '@fortawesome/free-regular-svg-icons';
import {CompanyService} from '../../../services/company.service';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {CitiesService} from '../../../services/cities.service';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {IsShowModalService} from '../../../services/is-show-modal.service';
import {UserService} from '../../../services/user.service';
import {EventEmmiterService} from '../../../services/event-remove.service';
import {SpinnerService} from '../../../services/spinner.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.css']
})
export class CreateEventModalComponent implements OnInit {

  faCalendar = faCalendarAlt;
  faImages = faImages;
  faMarker = faMapMarkerAlt;

  eventC: EventC;

  nameEvent: string;
  dateInit: string;
  dateFin: string;
  dateFinHour: string;
  imgs: Img[];
  typeEvent: Status[];
  description: string;
  clotheCode: Status[];
  minAge: number;
  tickets: Ticket[];
  capacity: number;
  address: string;
  establishments: EstablishmentViewId[];
  establishmentSelect: EstablishmentViewId;
  lat: number;
  lng: number;
  zoom: number;
  marker = {
    lat: null,
    lng: null
  };

  cities: string[];
  citySelect = 'Tunja';

  status: string;

  typeUbication: Status[];

  messageErrorDate: string;
  messageErrorEvent: string;
  messageErrorImage: string;
  messageErrorCodeClothe: string;
  messageErrorWhere: string;
  messageErrorUbication: string;
  messageErrorStatus: string;
  messageNoTickets: string;
  isScroll: boolean;

  idCompany: string;

  eventReg: EventRegister;
  @ViewChild('formEvent') formC: NgForm;
  isEdit = false;

  removeEvent: RemoveEvent;

  constructor(private comps: CompanyService, private cs: CitiesService, public loaderService: SpinnerService,
              private ers: EventEmmiterService, private userS: UserService, private router: Router, private authS: AuthService,
              private changeDetectorRef: ChangeDetectorRef, private nS: NotificationService, private ism: IsShowModalService
  ) {
    this.init();
    this.ism.isEditEvent.subscribe(bool => {
      this.isEdit = bool;
    });
    this.authS.getRoleId.subscribe(res => {
      this.idCompany = res;
    });
    this.ers.event.subscribe(ev => {
      this.removeEvent = ev;
    });
  }

  private init(): void {
    this.lat = 5.547408754375323;
    this.lng = -73.35709982734579;
    this.zoom = 15;
    this.imgs = [];
    this.tickets = [];
    const actualDate = new Date();
    const day = actualDate.getDate();
    const year = actualDate.getFullYear();
    const month = actualDate.getMonth() + 1;
    this.eventC = {
      name: '',
      img: '',
      hourInit: '',
      hourFin: '',
      date: `${year}-${month}-${day}`,
      city: ''
    };

    this.typeUbication = [{
      isSelect: false,
      name: 'Establecimiento'
    }, {
      isSelect: false,
      name: 'Otro'
    }];

    this.typeEvent = [
      {
        name: 'Abierto', isSelect: false
      },
      {
        name: 'Cerrado', isSelect: false
      }
    ];

    this.clotheCode = [{name: 'Coctel', isSelect: false},
      {
        name: 'Informal', isSelect: false
      }
    ];
  }

  ngOnInit(): void {
    this.cs.getCities().subscribe(res => {
      this.cities = res[5].ciudades;
      this.eventC.city = 'Tunja';
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.nS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
    $(document).ready(() => {
      $('#register-event-modal').on('show.bs.modal', () => {
        this.init();
        this.formC.reset();
        this.changeDetectorRef.detectChanges();
        this.getEstablishment();
        this.citySelect = 'Tunja';
        if (this.isEdit) {
          this.getEvent();
        }
      }).on('show.bs.hidden', () => {
        this.ism.isEventEdit.next(false);
      });
    });
  }

  onSubmit(): void {
    if (this.ifValidate()) {
      this.eventReg = {
        location: {
          longitude: this.marker.lng,
          latitude: this.marker.lat,
          city: this.eventC.city,
          address: this.address
        },
        capacity: this.capacity,
        description: this.description,
        dressCodes: this.getNames(this.clotheCode),
        end: this.makeDate(this.dateFin, this.eventC.hourFin),
        categories: this.getNames(this.typeEvent),
        eventName: this.eventC.name,
        minAge: this.minAge,
        photoUrls: [],
        start: this.makeDate(this.eventC.date, this.eventC.hourInit),
        tickets: this.tickets
      };
      this.comps.postPhotosEvent(this.imgs.map(myimg => myimg.imgFile)).subscribe(res => {
        this.eventReg.photoUrls = res.map(photoObj => photoObj.photo);
      }, error => {
        if (error.status === 500 || error.status === 503) {
          this.nS.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      }, () => {
        this.comps.postEvent(this.eventReg, this.establishmentSelect.establishmentId).subscribe(res => {
          $('#register-event-modal').modal('hide');
          this.router.navigate(
            ['company', this.idCompany, 'establishments', this.establishmentSelect.establishmentId, 'events', res.eventId]);
          this.nS.sucessRegisterEvent();
          this.formC.reset();
          this.changeDetectorRef.detectChanges();
        }, error => {
          if (error.status === 500 || error.status === 503) {
            this.nS.serverError();
          } else if (error.status === 401 || error.status === 403) {
            this.authS.logoutExpiredAndReload();
          }
        });
      });
    }
  }

  getNames(list: Status[]): string[] {
    return list.filter(cod => cod.isSelect === true).map(item => item.name);
  }

  ifValidate(): boolean {
    this.messageErrorDate = '';
    this.messageErrorCodeClothe = '';
    this.messageErrorEvent = '';
    this.messageErrorImage = '';
    this.messageErrorWhere = '';
    this.messageErrorUbication = '';
    this.messageErrorStatus = '';
    this.messageNoTickets = '';

    if (!this.ifAfter()) {
      this.messageErrorDate = 'La fecha inicial debe ser mayor a la actual';
      if (!this.isScroll) {
        const target = document.getElementById('dateInitEvent');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    if (!this.ifGreater()) {
      this.messageErrorDate = 'La fecha inicial debe ser menor a la final';
      if (!this.isScroll) {
        const target = document.getElementById('dateInitEvent');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    if (!this.isValidPhotos()) {
      if (!this.isScroll) {
        const target = document.getElementById('images-events');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    if (!this.ifCategoryLenght()) {
      this.messageErrorEvent = 'Debes seleccionar al menos una categoría';
      if (!this.isScroll) {
        const target = document.getElementById('category-event');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    if (!this.ifCodeClothe()) {
      this.messageErrorCodeClothe = 'Debes seleccionar al menos un código de vestimenta';
      if (!this.isScroll) {
        const target = document.getElementById('codeClothe');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    if (!this.ifTickets()) {
      this.messageNoTickets = 'Debes agregar al menos un tipo de entrada';
      if (!this.isScroll) {
        const target = document.getElementById('ticketsList');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    if (!this.ifSelectWhere()) {
      this.messageErrorWhere = 'Debes seleccionar alguna opción';
      if (!this.isScroll) {
        const target = document.getElementById('whereEvent');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    if (this.typeUbication[1].isSelect && this.marker.lat === null) {
      this.messageErrorUbication = 'Debes seleccionar la ubicación del evento';
      if (!this.isScroll) {
        const target = document.getElementById('ubicationEvent');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    this.isScroll = false;
    return this.messageErrorDate === '' && this.messageErrorImage === '' &&
      this.messageErrorUbication === '' && this.messageErrorWhere === '' &&
      this.messageErrorStatus === '' && this.messageErrorCodeClothe === '' &&
      this.messageErrorEvent === '' && this.messageNoTickets === '';
  }

  makeDate(date, hour): Date {
    const splitInitDate = date.split('-').map(x => Number.parseInt(x, 10));
    const splitInitHour = hour.split(':').map(x => Number.parseInt(x, 10));
    return new Date(splitInitDate[0], splitInitDate[1] - 1, splitInitDate[2], splitInitHour[0], splitInitHour[1], 0);
  }

  isValidPhotos(): boolean {
    if (this.imgs.length === 0) {
      this.messageErrorImage = 'Selecciona por lo menos una foto de tu establecimiento.';
      return false;
    } else if (this.imgs.length > 7) {
      this.messageErrorImage = 'Selecciona máximo 7 fotos de tu establecimiento.';
      return false;
    }
    return true;
  }

  ifCategoryLenght(): boolean {
    return this.typeEvent.find(value => value.isSelect === true) !== undefined;
  }

  ifCodeClothe(): boolean {
    return this.clotheCode.find(value => value.isSelect === true) !== undefined;
  }

  ifSelectWhere(): boolean {
    return this.typeUbication.find(value => value.isSelect === true) !== undefined;
  }

  ifTickets(): boolean {
    return this.tickets.length >= 1;
  }

  ifGreater(): boolean {
    const splitInitDate = this.eventC.date.split('-').map(x => Number.parseInt(x, 10));
    const splitInitHour = this.eventC.hourInit.split(':').map(x => Number.parseInt(x, 10));
    const dateInit = new Date(splitInitDate[0], splitInitDate[1] - 1, splitInitDate[2], splitInitHour[0], splitInitHour[1], 0);

    const splitFinDate = this.dateFin.split('-').map(x => Number.parseInt(x, 10));
    const splitFinHour = this.eventC.hourFin.split(':').map(x => Number.parseInt(x, 10));
    const dateFin = new Date(splitFinDate[0], splitFinDate[1] - 1, splitFinDate[2], splitFinHour[0], splitFinHour[1], 0);
    return dateInit < dateFin;
  }

  ifAfter(): boolean {
    const splitInitDate = this.eventC.date.split('-').map(x => Number.parseInt(x, 10));
    const splitInitHour = this.eventC.hourInit.split(':').map(x => Number.parseInt(x, 10));
    const dateInit = new Date(splitInitDate[0], splitInitDate[1] - 1, splitInitDate[2], splitInitHour[0], splitInitHour[1], 0);
    const dateActual = new Date();
    return dateActual < dateInit;
  }

  getEstablishment(): void {
    this.comps.getEstablishment().subscribe(res => {
      this.establishments = res.message.establishments;
      this.establishmentSelect = this.establishments[0];
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.nS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  preview(files: FileList): void {
    this.messageErrorImage = '';
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null || (!mimeType.match(/image\/png/) && !mimeType.match(/image\/jpeg/))) {
      this.messageErrorImage = 'Debes escoger un tipo de imagen válida.';
      this.eventC.img = '';
      return;
    }

    const reader = new FileReader();
    const imgP = files;
    let imgURL;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      imgURL = reader.result;
      this.eventC.img = imgURL;
      this.imgs.push({
        imgFile: imgP[0],
        imgUrl: imgURL
      });
    };
  }

  open_file(): void {
    document.getElementById('input_file1').click();
  }

  selectEvent(typeE: Status): void {
    this.messageErrorEvent = '';
    this.messageErrorCodeClothe = '';
    typeE.isSelect = !typeE.isSelect;
    if (typeE.isSelect) {
      document.getElementById(typeE.name).style.background = 'black';
      document.getElementById(typeE.name).style.color = 'white';
    } else {
      document.getElementById(typeE.name).style.background = '#fafafa';
      document.getElementById(typeE.name).style.color = '#c2c5c8';
    }
  }

  select(option: Status, list: Status[]): void {
    if (list[0].name === 'Activo') {
      this.messageErrorStatus = '';
    } else {
      this.messageErrorWhere = '';
    }
    if (option.name === 'Establecimiento') {
      this.eventC.city = this.establishmentSelect.location.city;
      this.marker.lat = this.establishmentSelect.location.latitude;
      this.marker.lng = this.establishmentSelect.location.longitude;
      this.address = this.establishmentSelect.location.address;
    } else if (option.name === 'Otro') {
      this.marker.lat = null;
      this.marker.lng = null;
      this.address = '';
    }
    option.isSelect = true;
    this.changeColorEnabled(option);
    list.forEach(opt => {
      if (opt !== option) {
        opt.isSelect = false;
        this.changeColorDisable(opt);
      }
    });
  }

  changeColorDisable(option: Status): void {
    document.getElementById(option.name).style.background = '#fafafa';
    document.getElementById(option.name).style.color = '#c2c5c8';
  }

  changeColorEnabled(option: Status): void {
    document.getElementById(option.name).style.background = 'black';
    document.getElementById(option.name).style.color = 'white';
  }

  ifValidateAll(): boolean {
    return this.ifMinAge() && this.ifCapacity();
  }

  ifMinAge(): boolean {
    return this.minAge >= 0;
  }

  ifCapacity(): boolean {
    return this.capacity >= 1;
  }

  mapClicked(lng: number, lat: number): void {
    this.marker.lat = lat;
    this.marker.lng = lng;
  }

  removeImg(img: Img): void {
    const index = this.imgs.indexOf(img, 0);
    if (index > -1) {
      this.imgs.splice(index, 1);
    }
  }

  change(): void {
    if (this.typeUbication[0].isSelect) {
      this.eventC.city = this.establishmentSelect.location.city;
      this.marker.lat = this.establishmentSelect.location.latitude;
      this.marker.lng = this.establishmentSelect.location.longitude;
      this.address = this.establishmentSelect.location.address;
    }
  }

  private getEvent(): void {

    this.userS.getEventById(this.removeEvent.idCompany, this.removeEvent.idEstablishment, this.removeEvent.idEvent).subscribe(() => {
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.nS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });

  }
}
