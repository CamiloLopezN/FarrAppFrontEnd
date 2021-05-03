import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from '../../../model/company';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.css']
})
export class SubscriptionCardComponent implements OnInit {

  @Input() sub: Subscription;
  @Input() isSub: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
