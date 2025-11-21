import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { HomeComponent } from './home/home';
import { AuthComponent } from './auth/auth.component';
import { LayoutModule } from './layout/layout-module';
import { SearchResultsComponent } from './search-results/search-results';
import { WorkerProfileComponent } from './worker-profile/worker-profile';
import { AuthInterceptor } from './services/auth.interceptor';
import { ModalComponent } from './layout/modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, // Isso já importa as rotas
    ToastrModule.forRoot(), // ToastrModule added
    LayoutModule,
    HomeComponent,
    SearchResultsComponent,
    WorkerProfileComponent,
    ModalComponent,
    AuthComponent,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
