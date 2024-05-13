import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from "@angular/cdk/a11y";

export interface PeriodicElement {
  name: string;
  lastVisit: string;
  amount: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Иван Иванов', lastVisit: '3 мая 2024 в 16:00', amount: 30000},
  {name: 'Артем Иванов', lastVisit: '4 мая 2024 в 16:00', amount: 10000},
  {name: 'Иван Иванов', lastVisit: '5 мая 2024 в 16:00', amount: 50000},

];

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})


export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'lastVisit', 'amount'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
