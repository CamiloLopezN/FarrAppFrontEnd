import {Component, OnInit} from '@angular/core';
import {faUserEdit, faUsers, faUserPlus, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  faUserEdit = faUserEdit;
  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faUser = faUser;

  constructor() {
  }

  ngOnInit(): void {
  }

}
