import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './apiservice';
import { FormsModule } from '@angular/forms'; // Importă FormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule], 
})
export class RegisterComponent {
    username: string = '';
    password: string = '';
  
  constructor(private apiService: ApiService,  private router: Router) { }

  register() {
    this.apiService.register(this.username, this.password).subscribe(response => {
      console.log('User registered', response);
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);

      this.router.navigate(['/caesar']);
    }, error => {
      console.error('Error registering', error);
    });
  }
}
