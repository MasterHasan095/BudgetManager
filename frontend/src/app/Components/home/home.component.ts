import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  // navigateToLogin() {
  //   this.router.navigate(['login']);
  // }

  // navigateToRegister() {
  //   this.router.navigate(['register']);
  // }
}
