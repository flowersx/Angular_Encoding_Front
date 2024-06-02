import { RegisterComponent } from './register.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { CaesarComponent } from './caesar.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'caesar', component: CaesarComponent}
  ];
