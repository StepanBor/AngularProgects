import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {NavigationSidebarComponent} from './navigation-sidebar/navigation-sidebar.component';
import {UsersComponent} from './users/users.component';
import {UsersDetailsComponent} from './users/users-details/users-details.component';
import {DataAccessService} from './data-access-services/data-access.service';
import {MyProbeDirective} from './my-directives/my-probe-directive';
import {NewProbeDirectiveDirective} from './my-directives/new-probe-directive.directive';
import {DropdownDirectiveDirective} from './my-directives/dropdown-directive.directive';
import {HomeComponent} from './home/home.component';
import {OrdersComponent} from './orders/orders.component';
import {BooksComponent} from './books/books.component';
import {UserCabinetComponent} from './user-cabinet/user-cabinet.component';
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';
import {OrderDetailModalComponent} from './orders/order-detail/order-detail-modal/order-detail-modal.component';
import {CanDeactivateGuard} from './can-deactivate-guard.service';
import {PasswordValidatorDirective} from './my-directives/password-validator.directive';
import { BooksManagerComponent } from './books/books-manager/books-manager.component';
import { BookItemDetailsComponent } from './books/book-item-details/book-item-details.component';
import { BookItemSmallCardComponent } from './books/book-item-small-card/book-item-small-card.component';
import { BookItemMidleCardComponent } from './books/book-item-midle-card/book-item-midle-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'orders', component: OrdersComponent, canDeactivate: [CanDeactivateGuard]},
  {path: 'bookItems', component: BooksComponent},
  {path: 'userCabinet', component: UserCabinetComponent}
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
    OrderDetailComponent,
    OrderDetailModalComponent,
    PasswordValidatorDirective,
    BooksManagerComponent,
    BookItemDetailsComponent,
    BookItemSmallCardComponent,
    BookItemMidleCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [DataAccessService, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
