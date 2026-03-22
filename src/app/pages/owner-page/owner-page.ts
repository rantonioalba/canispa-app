import {  Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'owner-page',
  imports: [],
  templateUrl: './owner-page.html',
})
export default class OwnerPage {
  authService = inject(AuthService);

  profile = this.authService.profile;

 }
