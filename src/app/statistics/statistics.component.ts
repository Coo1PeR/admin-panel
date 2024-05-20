import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  products: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.products = this.dashboardService.products;
  }
}
