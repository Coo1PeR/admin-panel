import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users-table/users-table.component";
import {StartPageComponent} from "./start-page/start-page.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
    title: 'Login Page'
  },
  {
    path: 'users',
    component: UsersComponent,
    title: 'Users'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
