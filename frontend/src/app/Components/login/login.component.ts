import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: any) {
    if (form.valid) {
      this.authService.login(form.value).subscribe(
        (response) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token); // Store JWT token
          this.router.navigate(['/']); // Navigate to the home page or dashboard
        },
        (error) => {
          console.error('Login failed', error);
          // Handle login error, e.g., display an error message
        }
      );
    }
  }
}
