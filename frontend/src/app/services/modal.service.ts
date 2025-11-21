import { Injectable, signal } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private component = signal<ComponentType<any> | null>(null);
  private isOpen = signal<boolean>(false);
  public data: any = {};

  component$ = this.component.asReadonly();
  isOpen$ = this.isOpen.asReadonly();

  open<T>(component: ComponentType<T>, data: any = {}) {
    this.data = data;
    this.component.set(component);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
    // Delay component cleanup to allow for exit animations
    setTimeout(() => {
      this.component.set(null);
      this.data = {};
    }, 300);
  }
}
