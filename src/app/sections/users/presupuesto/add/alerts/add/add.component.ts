import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsletterService } from '../../../../../../core/_services/';
import { config } from '../../../../../../core/_data/vapid_key';
import { SwPush } from '@angular/service-worker';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-add-alert',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddAlertComponent implements OnInit {
  months = [];
  data:any = { }
  type;
  activeCalendar = false;
  hourVal;
  activeSave = false;
  id;
  name="";
  description="";
  iconSave = false;
  repeat=null;
  segunda_alerta=0;
  err;
  edit:any = false;


  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService,
    private _router:Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {

  }





  save(){

  }

  delete(){

  }

  ngOnDestroy(){
  }

}
