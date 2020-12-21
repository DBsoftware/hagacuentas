import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SeoService } from '../../../../../core/_services';
import generalIcons from '../../../../../core/_data/general_icons';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  next = generalIcons.next
  months = [];
  calendar = false;
  alarms = [];
  data = { month: "", year: new Date().getFullYear(), presuId: false };

  constructor(
    _seo: SeoService,
    private _router: Router,
  ) { _seo.addTags('Alertas_de_presupuesto') }

  ngOnInit() {
  }



  activeAlert(alarm) {
    localStorage.setItem('editAl', alarm.id);
    this._router.navigate(['/presupuesto/alerts/add']);
  }

  back() {
    this._router.navigate(['/presupuestos']);
  }



}
