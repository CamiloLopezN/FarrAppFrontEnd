import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Category, EstablishmentRegister, EstablishmentType, Img, RemoveEstablishment} from '../../model/company';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {AdminService} from '../../services/admin.service';
import {faClipboardList, faGlassCheers, faImage, faImages, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {CitiesService} from '../../services/cities.service';
import {SpinnerService} from '../../services/spinner.service';
import {IsShowModalService} from '../../services/is-show-modal.service';
import {UserService} from '../../services/user.service';
import {EventEmmiterService} from '../../services/event-remove.service';


declare var $: any;

@Component({
  selector: 'app-create-establishment-modal',
  templateUrl: './create-establishment-modal.component.html',
  styleUrls: ['./create-establishment-modal.component.css']
})
export class CreateEstablishmentModalComponent implements OnInit {

  establishmentR: EstablishmentRegister;

  faImage = faImage;
  faImages = faImages;
  faGlassCheers = faGlassCheers;
  faMarkerAlt = faMapMarkerAlt;
  faClipBoard = faClipboardList;

  nameEst = '';
  desc = '';
  address = '';
  capacity: number;

  btnBar: string;
  btnDiscotheque: string;

  isBar: boolean;
  isDiscotheque: boolean;
  isSroll = false;

  messageErrorType: string;
  messageErrorCategory: string;
  messageErrorPhotos: string;
  messageErrorUbication: string;

  role: string;
  @ViewChild('formEstablishment') formC: NgForm;

  public imagePath;
  imgURL: string | ArrayBuffer = '';
  public message: string;
  public message2: string;

  images: Img[];
  categories: Category[];

  lat: number;
  lng: number;
  zoom: number;
  marker = {
    lat: null,
    lng: null
  };

  idCompany: string;

  cities: string[];
  citySelect = 'Tunja';
  isEdit: boolean;
  action = 'Registrar establecimiento';

  establishment: RemoveEstablishment;

  constructor(private notifyS: NotificationService, private authS: AuthService, private ism: IsShowModalService,
              private userS: UserService, private ers: EventEmmiterService,
              private router: Router, private companyService: CompanyService, public loaderService: SpinnerService,
              private changeDetectorRef: ChangeDetectorRef, private adminS: AdminService, private cs: CitiesService) {
    this.authS.roled.subscribe(roled => {
      this.role = roled;
    });
    this.authS.getRoleId.subscribe(res => {
      this.idCompany = res;
    });

    this.ism.isEstablishmentEdit.subscribe(bool => {
      this.isEdit = bool;
      if (this.isEdit) {
        this.getEstablishment();
        this.action = 'Editar establecimiento';
      } else {
        this.action = 'Registrar establecimiento';
      }
    });
    this.btnBar = 'btnBar';
    this.btnDiscotheque = 'btnDiscotheque';
    this.images = [];
    this.categories = [{
      category: {
        establishmentCategoryName: 'Campo abierto',
        description: 'Es un campo abierto y divertido'
      },
      select: false
    }, {
      category: {
        establishmentCategoryName: 'Encerrado',
        description: 'Es un campo cerrado y aburrido'
      },
      select: false
    }];
    this.lat = 5.547408754375323;
    this.lng = -73.35709982734579;
    this.zoom = 15;

    this.ers.establishment.subscribe(res => {
      this.establishment = res;
    });
    this.cs.getCities().subscribe(res => {
      this.cities = res[5].ciudades;
    }, () => {
    });
  }


  ngOnInit(): void {
    $('#register-establishment-modal').on('hidden.bs.modal', () => {
      this.ism.isEstablishment.next(false);
      this.ism.isEstablishmentEdit.next(false);
    });
    $(document).ready(() => {
      $('#register-establishment-modal').on('show.bs.modal', () => {
        this.init();
        this.formC.reset();
        this.changeDetectorRef.detectChanges();
        if (!this.isEdit) {
          this.citySelect = 'Tunja';
        }
      });
    });
  }

  init(): void {
    this.nameEst = '';
    this.desc = '';
    this.address = '';
    this.capacity = 0;

    this.isBar = false;
    this.isDiscotheque = false;
    this.isSroll = false;

    this.messageErrorType = '';
    this.messageErrorCategory = '';
    this.messageErrorPhotos = '';
    this.messageErrorUbication = '';

    this.imagePath = null;
    this.imgURL = '';
    this.message = '';
    this.message2 = '';

    this.images = [];
    this.marker.lat = null;
    this.marker.lng = null;

    this.categories = [{
      category: {
        establishmentCategoryName: 'Campo abierto',
        description: 'Es un campo abierto y divertido'
      },
      select: false
    }, {
      category: {
        establishmentCategoryName: 'Encerrado',
        description: 'Es un campo cerrado y aburrido'
      },
      select: false
    }];

    document.getElementById(this.btnBar).style.background = '#fafafa';
    document.getElementById(this.btnBar).style.color = '#c2c5c8';

    document.getElementById(this.btnDiscotheque).style.background = '#fafafa';
    document.getElementById(this.btnDiscotheque).style.color = '#c2c5c8';
  }

  selectBar(): void {
    this.messageErrorType = '';
    this.isBar = !this.isBar;
    if (this.isBar) {
      document.getElementById(this.btnBar).style.background = 'black';
      document.getElementById(this.btnBar).style.color = 'white';
    } else {
      document.getElementById(this.btnBar).style.background = '#fafafa';
      document.getElementById(this.btnBar).style.color = '#c2c5c8';
    }
  }

  selectDiscotheque(): void {
    this.messageErrorType = '';
    this.isDiscotheque = !this.isDiscotheque;
    if (this.isDiscotheque) {
      document.getElementById(this.btnDiscotheque).style.background = 'black';
      document.getElementById(this.btnDiscotheque).style.color = 'white';
    } else {
      document.getElementById(this.btnDiscotheque).style.background = '#fafafa';
      document.getElementById(this.btnDiscotheque).style.color = '#c2c5c8';
    }
  }

  selectCategorie(category: Category): void {
    this.messageErrorCategory = '';
    category.select = !category.select;
    if (category.select) {
      document.getElementById(category.category.establishmentCategoryName).style.background = 'black';
      document.getElementById(category.category.establishmentCategoryName).style.color = 'white';
    } else {
      document.getElementById(category.category.establishmentCategoryName).style.background = '#fafafa';
      document.getElementById(category.category.establishmentCategoryName).style.color = '#c2c5c8';
    }
  }

  preview(files): void {
    this.message = '';
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null || (!mimeType.match(/image\/png/) && !mimeType.match(/image\/jpeg/))) {
      this.message = 'Debes escoger un tipo de imagen válida.';
      this.imagePath = null;
      this.imgURL = '';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files[0];
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  open_file(): void {
    document.getElementById('input_file').click();
  }

  preview2(files: FileList): void {
    this.message2 = '';
    this.messageErrorPhotos = '';
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null || (!mimeType.match(/image\/png/) && !mimeType.match(/image\/jpeg/))) {
      this.message = 'Debes escoger un tipo de imagen válida.';
      this.imagePath = null;
      this.imgURL = '';
      return;
    }

    const reader = new FileReader();
    const imgP = files;
    let imgURL;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      imgURL = reader.result;
      this.images.push({
        imgFile: imgP[0],
        imgUrl: imgURL
      });
    };
  }

  open_file2(): void {
    document.getElementById('input_file2').click();
  }

  removeImg(img: Img): void {
    const index = this.images.indexOf(img, 0);
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }

  mapClicked(lng: number, lat: number): void {
    this.messageErrorUbication = '';
    this.marker.lat = lat;
    this.marker.lng = lng;
  }

  onSubmit(): void {
    if (this.validForm()) {
      let typeEstablishments: EstablishmentType[];
      typeEstablishments = [];
      if (this.isBar) {
        typeEstablishments.push({
          description: 'Lugar donde se toma sabroso',
          establishmentTypeName: 'Bar'
        });
      }
      if (this.isDiscotheque) {
        typeEstablishments.push({
          description: 'Lugar donde se baila sabroso',
          establishmentTypeName: 'Discoteca'
        });
      }

      this.establishmentR = {
        capacity: this.capacity,
        description: this.desc,
        establishmentName: this.nameEst,
        categories: this.categories.filter(category => category.select === true)
          .map(category => category.category.establishmentCategoryName),
        establishmentTypes: typeEstablishments.map(establishment => establishment.establishmentTypeName),
        logoUrl: '',
        photoUrls: [],
        location: {
          address: this.address,
          city: this.citySelect,
          latitude: this.marker.lat,
          longitude: this.marker.lng
        }
      };

      const promiseLogo = new Promise((resolve, reject) => {
        if (this.imagePath !== null) {
          this.companyService.postLogo(this.imagePath).subscribe(res => {
            resolve(res.logo);
          }, error => {
            if (error.status === 500 || error.status === 503) {
              this.notifyS.serverError();
            } else if (error.status === 401 || error.status === 403) {
              this.authS.logoutExpiredAndReload();
            }
            reject(error.message);
          });
        } else {
          resolve(this.imgURL as string);
        }
      });

      const promiseImages = new Promise((resolve, reject) => {
        const imgs = [];
        imgs.push(...this.images.filter(myImg => myImg.imgFile === undefined).map(img => img.imgUrl as string));
        const photos = this.images.map(myimg => myimg.imgFile).filter(img => img !== undefined);
        if (photos.length !== 0) {
          this.companyService.postPhotos(photos).subscribe(res => {
            imgs.push(...res.map(photoObj => photoObj.photo));
            resolve(imgs);
          }, error => {
            if (error.status === 500 || error.status === 503) {
              this.notifyS.serverError();
            } else if (error.status === 401 || error.status === 403) {
              this.authS.logoutExpiredAndReload();
            }
            reject(error.message);
          });
        } else {
          resolve(imgs);
        }
      });

      promiseLogo.then(logo => {
        promiseImages.then(imgs => {
          this.establishmentR.logoUrl = logo as string;
          this.establishmentR.photoUrls = imgs as string[];
          if (!this.isEdit) {
            this.companyService.postEstablishment(this.establishmentR).subscribe(res => {
                $('#register-establishment-modal').modal('hide');
                this.notifyS.succesEstablishmentCreated();
                this.formC.reset();
                this.changeDetectorRef.detectChanges();
                this.router.navigate(['company', this.idCompany, 'establishments', res.establishmentId]);
              }, error => {
                if (error.status === 500 || error.status === 503) {
                  this.notifyS.serverError();
                } else if (error.status === 401 || error.status === 403) {
                  this.authS.logoutExpiredAndReload();
                }
              }
            );
          } else {
            this.companyService.editEstablishment(this.establishmentR, this.establishment.idEstablishment).subscribe(() => {
                $('#register-establishment-modal').modal('hide');
                this.notifyS.succesEstablishmentEdited();
                this.formC.reset();
                this.changeDetectorRef.detectChanges();
                this.router.navigate(['company', this.idCompany, 'establishments', this.establishment.idEstablishment]);
              }, error => {
                if (error.status === 500 || error.status === 503) {
                  this.notifyS.serverError();
                } else if (error.status === 401 || error.status === 403) {
                  this.authS.logoutExpiredAndReload();
                }
              }, () => {
                if (this.router.url !== '/company/establishments') {
                  location.reload();
                }
              }
            );
          }
        });
      });
    }
  }

  validForm(): boolean {
    this.messageErrorType = '';
    this.messageErrorCategory = '';
    this.message = '';
    this.messageErrorPhotos = '';
    this.messageErrorUbication = '';
    if (!this.isBar && !this.isDiscotheque) {
      this.messageErrorType = 'Selecciona al menos un tipo.';
      if (!this.isSroll) {
        const target = document.getElementById('type-establishment');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isSroll = true;
      }
    }
    if (this.imgURL === '') {
      this.message = 'Debes seleccionar el logotipo de tu establecimiento.';
      if (!this.isSroll) {
        const target = document.getElementById('logo-establishment');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isSroll = true;
      }
    }
    if (!this.ifValidCategory()) {
      if (!this.isSroll) {
        const target = document.getElementById('category-establishment');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isSroll = true;
      }
    }
    if (!this.isValidPhotos()) {
      if (!this.isSroll) {
        const target = document.getElementById('photos-establishment');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isSroll = true;
      }
    }
    if (this.marker.lat === null && this.marker.lng === null) {
      this.messageErrorUbication = 'Debes seleccionar la ubicación de tu establecimiento';
      if (!this.isSroll) {
        const target = document.getElementById('ubication-establishment');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isSroll = true;
      }
    }
    this.isSroll = false;
    return this.messageErrorType === '' && this.messageErrorCategory === ''
      && this.message === '' && this.messageErrorPhotos === '' && this.messageErrorUbication === '';
  }

  isValidPhotos(): boolean {
    if (this.images.length === 0) {
      this.messageErrorPhotos = 'Selecciona por lo menos una foto de tu establecimiento.';
      return false;
    } else if (this.images.length > 7) {
      this.messageErrorPhotos = 'Selecciona máximo 7 fotos de tu establecimiento.';
      return false;
    }
    return true;
  }

  isValidLength(): boolean {
    return this.isNameLength() && this.isDescriptionLength() && this.isAddressLength();
  }

  isNameLength(): boolean {
    return this.nameEst.length <= 150;
  }

  isDescriptionLength(): boolean {
    return this.desc.length <= 1024;
  }

  isAddressLength(): boolean {
    return this.address.length <= 150;
  }

  ifValidCategory(): boolean {
    let count = 0;
    for (const category of this.categories) {
      if (category.select) {
        count++;
        if (count > 5) {
          this.messageErrorCategory = 'Selecciona máximo 5 categorías.';
          return false;
        }
      }
    }
    if (count === 0) {
      this.messageErrorCategory = 'Selecciona por lo menos una categoría.';
      return false;
    } else {
      return true;
    }
  }

  private getEstablishment(): void {
    this.userS.getEstablishmentById(this.establishment.idCompany, this.establishment.idEstablishment).subscribe(establishment => {
        this.imgURL = establishment.message.logoUrl;
        establishment.message.photoUrls.forEach(
          photo => this.images.push({
            imgFile: undefined,
            imgUrl: photo
          })
        );
        this.capacity = establishment.message.capacity;
        this.desc = establishment.message.description;
        this.nameEst = establishment.message.establishmentName;
        this.categories.forEach(category => {
          if (establishment.message.categories.find(cat => cat === category.category.establishmentCategoryName) !== undefined) {
            this.selectCategorie(category);
          }
        });
        if (establishment.message.establishmentTypes.find(typ => typ === 'Bar') !== undefined) {
          this.selectBar();
        }
        if (establishment.message.establishmentTypes.find(typ => typ === 'Discoteca') !== undefined) {
          this.selectDiscotheque();
        }
        this.address = establishment.message.location.address;
        this.citySelect = establishment.message.location.city;
        this.marker.lat = establishment.message.location.latitude;
        this.marker.lng = establishment.message.location.longitude;
      }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
      }, () => {
      }
    );

  }
}
