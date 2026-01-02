import { Component, OnInit } from '@angular/core';
import { WorkerProfile } from '../models/worker-profile.model';
import { WorkerService } from '../services/worker';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule]
})
export class SearchResultsComponent implements OnInit {

  workers: WorkerProfile[] = [];

  constructor(
    private workerService: WorkerService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const search = params['term'];
      const category = params['category'];
      this.workerService.getWorkers({ search, category }).subscribe(workers => {
        this.workers = workers;
      });
    });
  }

}