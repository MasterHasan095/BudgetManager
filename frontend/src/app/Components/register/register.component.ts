import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onRegister(form: any) {
    if (form.valid) {
      this.authService.register(form.value).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']); 
        },
        (error) => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}
