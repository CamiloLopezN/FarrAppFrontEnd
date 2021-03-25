import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../../services/company.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-establishment-perfil',
  templateUrl: './establishment-perfil.component.html',
  styleUrls: ['./establishment-perfil.component.css']
})
export class EstablishmentPerfilComponent implements OnInit {

  establishment: any;

  constructor(private compS: CompanyService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getEstablishment();
  }

  getEstablishment(): void {
    this.route.params.forEach((params: Params) => {
      const id = params.id;
      this.compS.getEstablishmentById(id).subscribe(res => {
        this.establishment = res.establishment;
        console.log(this.establishment);
      }, error => {
        console.log(error);
      });
    });
  }

  getCategories(): string {
    let myStr = '';
    this.establishment.category.forEach(category => {
      myStr += category.name + ' - ';
    });
    return myStr.slice(0, -2);
  }

}
