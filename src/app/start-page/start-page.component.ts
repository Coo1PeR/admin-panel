import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {UsersComponent} from "../users-table/users-table.component";
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [MatTabsModule, UsersComponent, RouterModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {

}
