import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {NavigationSidebarComponent} from './navigation-sidebar/navigation-sidebar.component';
import {UsersComponent} from './users/users.component';
import {UsersDetailsComponent} from './users/users-details/users-details.component';
import {UserDataAccessService} from './data-access-services/user.data-access.service';
import {MyProbeDirective} from './my-directives/my-probe-directive';
import {NewProbeDirectiveDirective} from './my-directives/new-probe-directive.directive';
import {DropdownDirectiveDirective} from './my-directives/dropdown-directive.directive';
import {HomeComponent} from './home/home.component';
import {OrdersComponent} from './orders/orders.component';
import {BooksComponent} from './books/books.component';
import {UserCabinetComponent} from './user-cabinet/user-cabinet.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'bookItems', component: BooksComponent},
  {path: 'userCabinet', component: UserCabinetComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NavigationSidebarComponent,
    UsersComponent,
    UsersDetailsComponent,
    MyProbeDirective,
    NewProbeDirectiveDirective,
    DropdownDirectiveDirective,
    HomeComponent,
    OrdersComponent,
    BooksComponent,
    UserCabinetComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserDataAccessService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
