import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceCategory } from '../models/service-category.model';
import { CategoryService } from '../services/category';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { User, Role } from '../models/user.model';
import { WorkerProfile } from '../models/worker-profile.model';
import { WorkerService } from '../services/worker';
import { ModalService } from '../services/modal.service';
import { AuthComponent } from '../auth/auth.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
})
export class HomeComponent implements OnInit {
  categories: ServiceCategory[] = [];
  currentUser: User | null = null;
  topRatedWorkers: WorkerProfile[] = [];
  Role = Role;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService,
    private workerService: WorkerService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    // Fetch top rated workers for all users (guests and authenticated)
    this.workerService.getWorkers({}).subscribe((workers) => {
      // Here we could sort by review rating if the API supports it
      this.topRatedWorkers = workers.slice(0, 6);
    });
  }

  search(term: string, category: string): void {
    this.router.navigate(['/search'], { queryParams: { term, category } });
  }

  openRegisterModal(): void {
    this.modalService.open(AuthComponent, { initialState: 'register' });
  }
}