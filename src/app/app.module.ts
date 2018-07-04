import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { MainAppComponent } from './pages/app/app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UiModule } from './ui/ui.module';

/* My reusable components */
import { SearchInputComponent } from './components/searchinput/input.component';
import { MyModalComponent } from './components/modal/modal.component';

/* Providers */
import { SearchingService } from '../providers/searching.service';
import { AuthenticationService } from '../providers/authentication.service';
import { AuthGuard } from '../providers/auth.guard';

/* Fake Backend */
import { fakeBackendProvider } from '../helpers/fake.backend';

/* Routing */
import { routing }  from './app.routing';

@NgModule({
  imports: [
    HttpClientModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    UiModule,
    routing
  ],
  declarations: [
    AppComponent,
    MainAppComponent,
    SigninComponent,
    SearchInputComponent,
    MyModalComponent
  ],
  providers: [
    SearchingService,
    AuthenticationService,
    AuthGuard,
    fakeBackendProvider
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
