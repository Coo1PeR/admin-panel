import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {StartPageComponent} from "./start-page/start-page.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, StartPageComponent, ShoppingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin-panel';
}
