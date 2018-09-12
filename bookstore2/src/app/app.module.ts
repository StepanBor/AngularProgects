import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NavigationSidebarComponent } from './navigation-sidebar/navigation-sidebar.component';
import { UsersComponent } from './users/users.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import {UserDataAccessService} from './data-access-services/user.data-access.service';
import {MyProbeDirective} from './my-directives/my-probe-directive';
import { NewProbeDirectiveDirective } from './my-directives/new-probe-directive.directive';
import { DropdownDirectiveDirective } from './my-directives/dropdown-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NavigationSidebarComponent,
    UsersComponent,
    UsersDetailsComponent,
    MyProbeDirective,
    NewProbeDirectiveDirective,
    DropdownDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    // HttpClientModule,
    HttpModule
  ],
  providers: [UserDataAccessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
