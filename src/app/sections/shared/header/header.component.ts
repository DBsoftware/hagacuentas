import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, tap, map } from 'rxjs/operators';
import { CookieService, LocationService } from '../../../core/_services';
import generalIcons from '../../../core/_data/general_icons';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AppStore } from '../../../core/store/store.interface';
import { Store } from '@ngrx/store';
import { selectList, actions } from '../../../core/store/presupuestos';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TermsComponent } from '../terms/terms.component';
type AOA = any[][];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  next =  generalIcons.next
  presupuestoList;
  helpActive: any = false;
  helpIcon = true;
  sideBar = false;
  slideActive = 0;
  presupuestos = [];
  sessionUs: any = false;
  finishedSearch = [];
  lang = "CO";
  time = new Date().getTime();
  openTerms = false

  categs = { gasto: [], ingreso: [] };

  data: AOA = [["Tipo", "Categoría", "Subcategoría", "Fecha movimiento", "Valor movimiento", "Descripción"]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

  typeHelp;

  constructor(
    private _router: Router,
    private _cookie: CookieService,
    private store$: Store<AppStore>,
    private _location: LocationService,
    private modalService: NgbModal
  ) {
    this.sessionUs = localStorage.getItem('correo')
    this.presupuestoList = this.store$.select(selectList).pipe(map(Object.values))
   }

  ngOnInit() {

  }

  open() {
    const modalRef = this.modalService.open(TermsComponent);
  }

  share() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      let newVariable: any;
      newVariable = window.navigator;
      if (newVariable.share) {
        newVariable.share({
          title: "Haga Cuentas",
          text: "Lo invitamos a registras sus movimientos de ingresos y gastos cada vez que se presenten.",
          url: location.origin
        }).then(() => {
          console.log('Thanks for sharing!');
        })
          .catch(err => {
            console.log(`Couldn't share because of`, err.message);
          });
      } else {
        $('#socialButtons').modal('show');
      }
    } else {
      $('#socialButtons').modal('show');
    }
  }

  activeHelp() {
    if (this.sideBar)
      return false;
    switch (location.pathname) {
      case '/presupuesto/ingresos/calculadora':
      case '/presupuesto/gastos/calculadora':
        $('html, body').animate({ scrollTop: 0 }, "slow");
        $('body').css('overflow', 'hidden');
        if(location.pathname.indexOf('ingresos')==-1){
          this.typeHelp = 'gasto';
        } else {
          this.typeHelp = 'ingreso';
        }
        this.helpActive = 'calculator';
        break;
      case '/presupuesto':
        this.helpActive = 'presupuesto';
        break;
      case '/presupuesto/ingresos':
        this.helpActive = 'ingresos'
        break;
      case '/presupuesto/gastos':
        this.helpActive = 'gastos'
        break;
      case '/presupuesto/estadisticas/resumen':
      case '/presupuesto/estadisticas/gastos-por-categoria':
      case '/presupuesto/estadisticas/movimientos':
      case '/presupuesto/estadisticas/comparar':
        this.helpActive = 'estadisticas'
        break;
      case '/tips':
        this.helpActive = 'tips'
        break;
      case '/presupuesto/ingresos/agregar-categoria':
        this.helpActive = 'subcategoria'
        break;
      case '/presupuesto/gastos/agregar-categoria':
        this.helpActive = 'categoria'
        break;
      case '/presupuesto/alerts':
        this.helpActive = 'alerta'
        break;
      case '/presupuesto/alerts/add':
        this.helpActive = 'crearAlerta'
        break;
    }
  }

  disableHelp() {
    $('body').removeAttr('style');
    this.helpActive = false;
    this.slideActive = 0;
  }

  nextSlide(last, action: boolean = false) {
    if (this.slideActive == last && action == false) {
      this.disableHelp();
      return false;
    }
    if (this.slideActive != last)
      this.slideActive = this.slideActive + 1;
  }

  backSlide() {
    if (this.slideActive != 0)
      this.slideActive = this.slideActive - 1;
  }

  activeSide() {
    this.sideBar = !this.sideBar;
    if (this.sideBar) {
      $('body').addClass('sideBar')
    } else {
      $('body').removeClass('sideBar')
    }
  }

  activeAlert(presupuesto) {
    this.store$.dispatch(actions.selectPresupuesto({presupuestoId:presupuesto.id}));
    this._router.navigate(['presupuesto/index'])
  }

  selectPresu(presupuesto) {
    this.store$.dispatch(actions.selectPresupuesto({presupuestoId:presupuesto.id}));
    this._router.navigate(['presupuesto/index'])
  }

  activeTerms() {
    $('body').addClass('showTerms');
    this._location.getCodeFromApi()
  }

  getData(movi, length, presu, nombre) {

  }

  download(id, format = 'xls') {
    var nombrePresu = "Presupuesto";
    this.finishedSearch = [];
    this.data = [["Tipo", "Categoría", "Subcategoría", "Fecha movimiento", "Valor movimiento", "Descripción"]];
    var dataPresu: any;

    // categs['gastos'].forEach(categ => {
    //   this.categs.gasto.push(categ);
    // });
    // categs['ingresos'].forEach(categ => {
    //   this.categs.ingreso.push(categ);
    // });

    var localCategs = localStorage.t_category ? JSON.parse(localStorage.t_category) : [];
    localCategs.forEach(categ => {
      if (categ.tipo == 1) {
        categ.subcategorias.forEach(subCateg => {
          this.categs.ingreso.push(subCateg);
        });
      } else {
        this.categs.gasto.push(categ);
      }
    });

    if (localStorage.tempPresu) {
      var tempPresu = JSON.parse(localStorage.tempPresu);
      tempPresu.forEach(presu => {
        if (presu.id == id || presu.id_app == id) {
          dataPresu = presu;
          nombrePresu = presu.nombre;
        }
      });
    }
    if (localStorage.movTemp) {
      var movTemps = JSON.parse(localStorage.movTemp);
      movTemps.forEach(movi => {
        movi.valor = movi.valor.replace(/\./g, '').replace(/\,/g, '');
        // movi.valor = this._data.convertMoney(movi.valor, this.lang);
        var d = new Date();
        this.getData(movi, movTemps.length, dataPresu, nombrePresu + ` (${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}).${format}`);
      });
    }
  }

  export(data, fileName): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    if (fileName.slice(-3) == 'csv') {
      let wbout = XLSX.utils.sheet_to_csv(wb.Sheets['Sheet1'], { FS: ';' });
      saveAs(new Blob(["\ufeff" + wbout], { type: "application/octet-stream" }), fileName);
    } else {
      /* save to file */
      XLSX.writeFile(wb, fileName);
    }
  }

  close() {
    this.sideBar = false;
    $('body').removeClass('sideBar')
  }

  goToregister(){
    this._router.navigate(['/login', 'register'])
  }

}
