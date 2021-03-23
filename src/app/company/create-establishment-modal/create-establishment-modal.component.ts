import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Category, Img} from '../../model/company';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {AdminService} from '../../services/admin.service';
import {
  faGlassCheers,
  faImage,
  faImages,
  faMapMarkerAlt,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import {CitiesService} from '../../services/cities.service';


declare var $: any;

@Component({
  selector: 'app-create-establishment-modal',
  templateUrl: './create-establishment-modal.component.html',
  styleUrls: ['./create-establishment-modal.component.css']
})
export class CreateEstablishmentModalComponent implements OnInit {

  faImage = faImage;
  faImages = faImages;
  faGlassCheers = faGlassCheers;
  faMarkerAlt = faMapMarkerAlt;
  faClipBoard = faClipboardList;

  nameEst: string;
  desc: string;
  address: string;
  capacity: number;

  btnBar: string;
  btnDiscotheque: string;

  isBar: boolean;
  isDiscotheque: boolean;


  messageErrorType: string;

  role: string;
  @ViewChild('formClient') formC: NgForm;

  public imagePath;
  imgURL: any;
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

  cities: string[];
  citySelect = 'Tunja';

  constructor(private notifyS: NotificationService, private authS: AuthService,
              private router: Router, private companyService: CompanyService,
              private changeDetectorRef: ChangeDetectorRef, private adminS: AdminService, private cs: CitiesService) {
    this.authS.roled.subscribe(roled => {
      this.role = roled;
    });
    this.btnBar = 'btnBar';
    this.btnDiscotheque = 'btnDiscotheque';
    this.images = [];
    this.categories = [{
      name: 'Campo abierto',
      select: false
    }, {
      name: 'Encerrado',
      select: false
    }
    ];
    this.lat = 5.547408754375323;
    this.lng = -73.35709982734579;
    this.zoom = 15;
  }


  ngOnInit(): void {
    this.cs.getCities().subscribe(res => {
      this.cities = res[5].ciudades;
    }, error => {
      console.log(error);
    });

    $(document).ready(() => {
      $('#register-company-modal').on('show.bs.modal', () => {
        this.authS.inRegCompany.next(false);
        this.formC.reset();
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  selectBar(): void {
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
    this.messageErrorType = '';
    category.select = !category.select;
    if (category.select) {
      document.getElementById(category.name).style.background = 'black';
      document.getElementById(category.name).style.color = 'white';
    } else {
      document.getElementById(category.name).style.background = '#fafafa';
      document.getElementById(category.name).style.color = '#c2c5c8';
    }
  }

  preview(files): void {
    this.message = '';
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null || mimeType.match(/image\/x-icon/) || mimeType.match(/image\/svg+xml/)) {
      this.message = 'Debes escoger un tipo de imagen válida.';
      this.imagePath = null;
      this.imgURL = '';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
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
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null || mimeType.match(/image\/x-icon/) || mimeType.match(/image\/svg+xml/)) {
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
        imgFile: imgP,
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
    this.marker.lat = lat;
    this.marker.lng = lng;
  }

  onSubmit(): void {
    this.messageErrorType = '';
    if (!this.isBar || !this.isDiscotheque) {
      this.messageErrorType = 'Selecciona al menos un tipo';
    }
  }
}
