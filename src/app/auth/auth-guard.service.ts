import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from "@angular/router";
import { Injectable } from "@angular/core";
/* import { Observable } from 'rxjs/Observable'; */
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }

  // canActivateChild(route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.canActivate(route, state);
  // }
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   return this.authService.isAuthenticated()
  //     .then(
  //     (authenticated: boolean) => {
  //       if (authenticated) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/']);
  //       }
  //     });
  // }
}
