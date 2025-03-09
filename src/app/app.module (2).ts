import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms'; // IMPORTER ReactiveFormsModule
import { FormsModule } from '@angular/forms'; // Importation importante pour ngModel

import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { NiveauxComponent } from './niveaux/niveaux.component';
import { SpecialiteComponent } from './specialites/specialites.component'; 
import { RegimesComponent } from './regimes/regimes.component';
import { DepartementsComponent } from './departements/departements.component';
import { CoursComponent } from './cours/cours.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule  } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    UtilisateursComponent,
    NiveauxComponent,
    SpecialiteComponent,
    RegimesComponent,
    DepartementsComponent,
    CoursComponent,
    NotificationsComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule , 
    RouterModule ,
    BrowserAnimationsModule,
    MatSnackBarModule

     // AJOUTER ICI
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
