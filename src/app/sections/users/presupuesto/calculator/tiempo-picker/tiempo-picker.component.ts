import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tiempo-picker',
  templateUrl: './tiempo-picker.component.html',
  styleUrls: ['./tiempo-picker.component.scss']
})
export class TiempoPickerComponent implements OnInit {
  time = {hour: 13, minute: 30};
  meridian = true;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
