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

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory() {
  return new TranslateHttpLoader();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
      },
      defaultLanguage: 'pt-BR'
    }),
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
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: './assets/i18n/',
        suffix: '.json'
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
