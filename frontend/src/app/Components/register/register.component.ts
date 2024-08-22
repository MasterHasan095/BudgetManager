import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {

   }

  register(): void {
  //   const user = { username: this.username, password: this.password };
  //   this.authService.register(user).subscribe(
  //     () => {
  //       alert('Registration successful');
  //       this.router.navigate(['/login']);
  //     },
  //     (error: any) => {
  //       alert('Registration failed');
  //     }
  //   );
  // }
  console.log("hi");
  }
}
