import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {DataAccessService} from './data-access-services/data-access.service';
import {CanDeactivateGuard} from './can-deactivate-guard.service';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {HomeComponent} from './home/home.component';
import {BookItemDetailsComponent} from './book-item-details/book-item-details.component';
import {BookItemSmallCardComponent} from './book-item-small-card/book-item-small-card.component';
import {BookItemMidleCardComponent} from './book-item-midle-card/book-item-midle-card.component';
import {BookItemLineComponent} from './home/book-item-line/book-item-line.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {LoginNewUserComponent} from './login-new-user/login-new-user.component';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bookItem/:bookId', component: BookItemDetailsComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'userCabinet', component: UserCabinetComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    BookItemDetailsComponent,
    BookItemSmallCardComponent,
    BookItemMidleCardComponent,
    BookItemLineComponent,
    SideMenuComponent,
    ShoppingCartComponent,
    LoginNewUserComponent,
    UserCabinetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  entryComponents: [LoginNewUserComponent],
  providers: [DataAccessService, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
