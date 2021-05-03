import {Component, OnInit} from '@angular/core';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.css']
})
export class ModalWarningComponent implements OnInit {


  faCheckSolid = faCheck;

  constructor() {
  }

  ngOnInit(): void {
  }

}
