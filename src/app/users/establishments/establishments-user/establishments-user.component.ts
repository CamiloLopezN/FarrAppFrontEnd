import { Component, OnInit } from '@angular/core';
import {EstablishmentView} from '../../../model/company';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-establishments-user',
  templateUrl: './establishments-user.component.html',
  styleUrls: ['./establishments-user.component.css']
})
export class EstablishmentsUserComponent implements OnInit {

  establishments: EstablishmentView[];

  constructor(private userS: UserService) {
  }


  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments(): void {
    this.userS.getEstablishments().subscribe(res => {
      this.establishments = res[0].data.map(establishment => establishment.establishments);
      console.log(this.establishments);
    }, error => {
      console.log(error);
    });
  }

}
