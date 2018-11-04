import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DataAccessService} from './data-access-services/data-access.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private dataAccessService: DataAccessService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.dataAccessService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/loginPage']);
    }


  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
