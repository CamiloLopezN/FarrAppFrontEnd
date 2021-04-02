import {Component, OnInit} from '@angular/core';
import {faStar as fs} from '@fortawesome/free-solid-svg-icons';
import {faStar} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-user-comment-modal',
  templateUrl: './user-comment-modal.component.html',
  styleUrls: ['./user-comment-modal.component.css']
})
export class UserCommentModalComponent implements OnInit {

  stars: boolean[];
  faStartSolid = fs;
  faStart = faStar;
  qualification = 0;

  constructor() {
    this.stars = [false, false, false, false, false];
  }

  ngOnInit(): void {
  }

  refresh(): void {
    this.stars.forEach((v, i, a) => a[i] = false);
  }

  setStarsClick(i: number): void {
    this.refresh();
    this.qualification = i + 1;
    for (let j = 0; j <= i; j++) {
      this.stars[j] = true;
    }
  }
}
