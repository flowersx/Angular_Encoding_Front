import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelloWorldResponse } from './interfaces/helloWorldResponse'
import { CezarResponse } from './interfaces/cezarResponse';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // URL-ul serverului Node.js

  constructor(private http: HttpClient) { }

  getHelloWorld(): Observable<HelloWorldResponse > {
    return this.http.get<HelloWorldResponse >(`${this.baseUrl}/`);
  }

  
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  saveCezar(username: string | null, normalString: string | null, encryptedString : string | null){
    return this.http.post(`${this.baseUrl}/cezarSalveaza`, { username, normalString,  encryptedString});
  }

  findCezarByUsername(username: string): Observable<CezarResponse[]> { // New method
    return this.http.post<CezarResponse[]>(`${this.baseUrl}/cezarGaseste`, { username }); // Adjust URL based on backend logic
  }
}
