import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SocialButtonsComponent } from '../../core/_templates/share/social-buttons/social-buttons.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { SafeHtmlPipe, FilterPipe } from '../../core/_pipes';
import { ToastsContainer } from '../../core/toast/toasts-container.component';
import { NgInitDirective } from '../../core/_directives/ng-init.directive';
import { TerminosColombianosComponent } from './terms/terminos-colombianos/terminos-colombianos.component';
import { TerminosCostaRicaComponent } from './terms/terminos-costa-rica/terminos-costa-rica.component';
import { TerminosSalvadorComponent } from './terms/terminos-salvador/terminos-salvador.component';
import { TermsComponent } from './terms/terms.component';
import {NgbModalModule, NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    SocialButtonsComponent,
    FilterPipe,
    SafeHtmlPipe,
    NgInitDirective,
    TerminosColombianosComponent,
    TerminosCostaRicaComponent,
    TerminosSalvadorComponent,
    TermsComponent,
    ToastsContainer
  ],
  imports: [
    CommonModule,
    ShareButtonsModule,
    NgbModalModule,
    NgbModule,
    RouterModule
  ],
  entryComponents: [TermsComponent],
  exports: [
    HeaderComponent,
    FilterPipe,
    SafeHtmlPipe,
    NgInitDirective,
    TermsComponent,
    ToastsContainer
  ],
  providers: [NgbActiveModal]
})
export class ShareAppModule { }
