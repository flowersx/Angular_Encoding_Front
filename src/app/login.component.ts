import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpStatusCode } from '@angular/common/http';
import { ApiService } from './apiservice';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule] 
})
export class LoginComponent {
  username: string = '';
  password: string= '';

  constructor(private apiService: ApiService, private router: Router) { }

  login() {
    var result = this.apiService.login(this.username, this.password).subscribe(response => {
      console.log('User logged in', response);
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);

      this.router.navigate(['/caesar']);
    }, error => {
      console.error('Error logging in', error);
    });
  }
}
