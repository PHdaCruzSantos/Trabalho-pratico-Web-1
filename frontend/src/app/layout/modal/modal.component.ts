import { Component, computed } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule, PortalModule],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slide', [
      transition('void => *', [
        style({ transform: 'translateY(-50px)' }),
        animate('300ms ease-in-out', style({ transform: 'translateY(0)' }))
      ]),
      transition('* => void', [
        animate('300ms ease-in-out', style({ transform: 'translateY(-50px)' }))
      ])
    ])
  ]
})
export class ModalComponent {
  // Fix: Initialize isOpen$ as a computed signal
  isOpen$ = computed(() => this.modalService.isOpen$());
  
  componentPortal = computed(() => {
    const componentType = this.modalService.component$();
    return componentType ? new ComponentPortal(componentType) : null;
  });

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.close();
  }
}
