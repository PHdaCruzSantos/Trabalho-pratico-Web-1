import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  showSuccess(messageKey: string, titleKey: string = 'NOTIFICATION.SUCCESS', params?: any): void {
    this.translate.get([messageKey, titleKey], params).subscribe(translations => {
      this.toastr.success(translations[messageKey], translations[titleKey]);
    });
  }

  showError(messageKey: string, titleKey: string = 'NOTIFICATION.ERROR', params?: any): void {
    this.translate.get([messageKey, titleKey], params).subscribe(translations => {
      this.toastr.error(translations[messageKey], translations[titleKey]);
    });
  }

  showInfo(messageKey: string, titleKey: string = 'NOTIFICATION.INFO', params?: any): void {
    this.translate.get([messageKey, titleKey], params).subscribe(translations => {
      this.toastr.info(translations[messageKey], translations[titleKey]);
    });
  }

  showWarning(messageKey: string, titleKey: string = 'NOTIFICATION.WARNING', params?: any): void {
    this.translate.get([messageKey, titleKey], params).subscribe(translations => {
      this.toastr.warning(translations[messageKey], translations[titleKey]);
    });
  }
}
