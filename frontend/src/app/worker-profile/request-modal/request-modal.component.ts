import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ModalService } from '../../services/modal.service';
import { RequestService } from '../../services/request';

@Component({
    selector: 'app-request-modal',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule],
    templateUrl: './request-modal.component.html',
    styleUrls: ['./request-modal.component.css']
})
export class RequestModalComponent implements OnInit {
    workerId: string = '';
    workerName: string = '';
    title: string = '';
    description: string = '';
    loading: boolean = false;
    success: boolean = false;
    errorMessage: string = '';

    constructor(
        private modalService: ModalService,
        private requestService: RequestService
    ) { }

    ngOnInit(): void {
        // The data is passed via the ModalService when opening
        this.workerId = this.modalService.data.workerId;
        this.workerName = this.modalService.data.workerName;
    }

    closeModal(): void {
        this.modalService.close();
    }

    submitRequest(): void {
        if (!this.title.trim() || !this.description.trim()) {
            this.errorMessage = 'Por favor, preencha todos os campos.';
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.requestService.createRequest({
            title: this.title,
            description: this.description,
            workerId: this.workerId
        }).subscribe({
            next: () => {
                this.loading = false;
                this.success = true;
                setTimeout(() => this.closeModal(), 2500);
            },
            error: (err) => {
                this.loading = false;
                this.errorMessage = err.error?.message || 'Ocorreu um erro ao enviar a solicitação.';
            }
        });
    }
}
