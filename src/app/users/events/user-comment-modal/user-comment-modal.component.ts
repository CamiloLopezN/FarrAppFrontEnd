import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {faStar as fs} from '@fortawesome/free-solid-svg-icons';
import {faStar} from '@fortawesome/free-regular-svg-icons';
import {AuthService} from '../../../services/auth.service';
import {CompanyService} from '../../../services/company.service';
import {ActivatedRoute} from '@angular/router';
import {MyComment} from '../../../model/opinion';
import {NgForm} from '@angular/forms';
import {SpinnerService} from '../../../services/spinner.service';
import {NotificationService} from '../../../services/notification.service';

declare var $: any;

@Component({
  selector: 'app-user-comment-modal',
  templateUrl: './user-comment-modal.component.html',
  styleUrls: ['./user-comment-modal.component.css']
})
export class UserCommentModalComponent implements OnInit {

  stars: boolean[];
  faStartSolid = fs;
  faStart = faStar;
  qualification = 1;
  name: string;
  lastName: string;
  title = '';
  comment = '';
  commentRes: MyComment;

  @Input() isCommentEvent: boolean;

  @Output() public addComment: EventEmitter<any> = new EventEmitter();

  @ViewChild('formComment') formRecipe: NgForm;

  constructor(private authS: AuthService, private companyS: CompanyService, private notifyS: NotificationService,
              private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, public loaderService: SpinnerService) {
    this.stars = [true, false, false, false, false];
    this.authS.getName.subscribe(nam => {
      this.name = nam.split(',')[0];
      this.lastName = nam.split(',')[1];
    });
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $('#commentEventModal').on('show.bs.modal', () => {
        this.stars = [true, false, false, false, false];
        this.qualification = 1;
        this.comment = '';
        this.commentRes = undefined;
        this.title = '';
        this.formRecipe.reset();
        this.changeDetectorRef.detectChanges();
      });
    });

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

  sendComment(): void {
    if (this.isCommentEvent) {
      this.companyS.sendCommentEvent(this.route.snapshot.params.idEvent, {
        comment: this.comment,
        rating: this.qualification,
        title: this.title
      }).subscribe(res => {
        this.commentRes = res.createdReview;
        const myRes = {
          comment: this.commentRes,
          averageRating: res.averageRating
        };
        this.addComment.emit(myRes);
        $('#commentEventModal').modal('hide');
      }, error => {
        if (error.status === 500 || error.status === 503) {
          this.notifyS.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      });
    } else {
      this.companyS.sendCommentEstablishment(this.route.snapshot.params.id, {
        comment: this.comment,
        rating: this.qualification,
        title: this.title
      }).subscribe(res => {
        this.commentRes = res.createdReview;
        const myRes = {
          comment: this.commentRes,
          averageRating: res.averageRating
        };
        this.addComment.emit(myRes);
        $('#commentEventModal').modal('hide');
      }, error => {
        if (error.status === 500 || error.status === 503) {
          this.notifyS.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      });
    }
  }

  isValidateComment(): boolean {
    return this.comment.length <= 512;
  }

  isTitleComment(): boolean {
    return this.title.length <= 65;
  }

  isValidateAll(): boolean {
    return this.isValidateComment() && this.isTitleComment();
  }
}
