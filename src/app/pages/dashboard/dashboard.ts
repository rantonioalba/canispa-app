import {  Component, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',

})
export default class Dashboard {
  asideOpen: boolean = true;
  profileOpen = false;

  authService = inject(AuthService);

  profile = this.authService.profile;

}
