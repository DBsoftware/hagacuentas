import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss']
})
export class SocialButtonsComponent implements OnInit {

  url = location.origin;
  host;

  constructor() { }

  ngOnInit() {
  }

}
