import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {faIdCard} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {

  client: Client;
  faLock = faLock;
  faUser = faUser;
  faCalendarDay = faCalendarDay;
  faIdCard = faIdCard;

  nameClient: string;
  lastName: string;
  birthdate: string;
  gender: string;
  email: string;
  password: string;


  constructor() {

  }

  onSubmit(): void {
    this.client = new Client();
    this.client.nameC = this.nameClient;
    this.client.lastName = this.lastName;
    this.client.birthdate = this.birthdate;
   // this.client.gender = this.gender;
    this.client.e_mail = this.email;
    this.client.password = this.password;
    console.log(this.client.e_mail);
  }

  ngOnInit(): void {
  }

}
