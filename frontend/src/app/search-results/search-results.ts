import { Component, OnInit } from '@angular/core';
import { WorkerProfile } from '../models/worker-profile.model';
import { WorkerService } from '../services/worker';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SearchResultsComponent implements OnInit {

  workers: WorkerProfile[] = [];

  constructor(
    private workerService: WorkerService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const name = params['term'];
      const category = params['category'];
      this.workerService.getWorkers({ name, category }).subscribe(workers => {
        this.workers = workers;
      });
    });
  }

}