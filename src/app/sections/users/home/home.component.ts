import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../core/_services/seo.service';
import Icons from '../../../core/_data/general_icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logo = Icons.logo
  constructor(_seo: SeoService) { _seo.addTags('Inicio') }

  ngOnInit() {
  }

}
