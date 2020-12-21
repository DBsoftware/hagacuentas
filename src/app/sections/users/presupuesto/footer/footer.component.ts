import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input('icon') icon: any = false;
  newMov = false;
  pagActive = null;

  constructor(
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }  

}
