import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { actions, selectLoading } from '../../core/store/presupuestos';
import { Store } from '@ngrx/store';
import { AppStore } from '../../core/store/store.interface';
import { SyncService } from '../../core/_services/sync.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  splash

  constructor(private store$: Store<AppStore>, private syncService :SyncService) { 
      this.store$.dispatch(actions.loadPresupuestoList());
      this.syncService.sync()
    }
    
    ngOnInit() {
      this.splash = this.store$.select(selectLoading)
  }


}
