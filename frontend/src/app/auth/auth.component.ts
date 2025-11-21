import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
})
export class AuthComponent implements OnInit {
  isLogin = true;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    if (this.modalService.data.initialState === 'register') {
      this.isLogin = false;
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}
