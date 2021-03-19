import {Component, OnInit} from '@angular/core';
import {faUserEdit, faUsers, faUserPlus, faUser} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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

  constructor(public authS: AuthService, private router: Router) {

  }

  ngOnInit(): void {
  }

  companies():void {
    this.router.navigate(['/admin/company']);
  }

  clients():void {
    this.router.navigate(['/admin/client']);
  }
}
