import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importă FormsModule
import { NgModule } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
.catch(err => console.error(err));