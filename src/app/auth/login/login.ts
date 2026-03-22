import { AuthService } from './../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginMapper } from './mapper/login.mapper';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
})
export default class Login implements OnInit {
  constructor(private router: Router) {}

  authService = inject(AuthService);


  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });


  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      // Aquí puedes manejar el envío del formulario, por ejemplo, llamar a un servicio de autenticación
      console.log('Username:', username);
      console.log('Password:', password);

      this.authService.doLogin(this.loginForm.value)
      .subscribe((response) => {
        // Navegar a otra página después del login exitoso
        this.router.navigate(['/dashboard']);
      });








      this.router.navigate(['/dashboard']);
      this.loginForm.reset(); // Reiniciar el formulario después del envío
    } else {
      // Manejar el caso cuando el formulario no es válido
      this.loginForm.markAllAsTouched();
      console.log('Formulario no válido');
      alert('Por favor, complete el formulario correctamente.');
    }
  }

}
