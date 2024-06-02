import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './apiservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, HttpClientModule]  // Adăugăm modulele necesare aici
})

export class AppComponent {
  title = 'Test';
  helloWorld = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getHelloWorld().subscribe(data => {
      this.helloWorld = data.message;
      console.log(data);
    });
  }
}
