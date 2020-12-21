import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CookieService, LocationService } from '../../../core/_services';
import { tap, first, take } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermsComponent implements OnInit {
  lang;

  constructor(
    public activeModal: NgbActiveModal
    ) {
  }

  ngOnInit() {
    this.lang = localStorage.getItem('country')
  }


}
