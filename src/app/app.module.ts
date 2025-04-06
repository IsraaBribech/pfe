import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NiveauxComponent } from './niveaux/niveaux.component';
import { SpecialitesComponent } from './specialites/specialites.component';
import { RegimesComponent } from './regimes/regimes.component';
import { DepartementsComponent } from './departements/departements.component';
import { CoursComponent } from './cours/cours.component';
import { NotificationsComponent } from './deuxieme-interface/notifications/notifications.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { DeuxiemeInterfaceComponent } from './deuxieme-interface/deuxieme-interface.component';
import { CourComponent } from './deuxieme-interface/cour/cour.component';
import { DevoirComponent } from './deuxieme-interface/devoir/devoir.component';
import { QuizComponent } from './deuxieme-interface/quiz/quiz.component';
import { MessageComponent } from './deuxieme-interface/message/message.component';
import { ChapitreComponent } from './deuxieme-interface/chapitre/chapitre.component';
import { TroixiemeInterfaceComponent } from './troixieme-interface/troixieme-interface.component';
import { CourSuivieComponent } from './troixieme-interface/cour-suivie/cour-suivie.component';
import { QuizRepondComponent } from './troixieme-interface/quiz-repond/quiz-repond.component';
import { MessageEnvoyerComponent } from './troixieme-interface/message-envoyer/message-envoyer.component';
import { DevoirRealiserComponent } from './troixieme-interface/devoir-realiser/devoir-realiser.component';
import { VoeuxComponent } from './deuxieme-interface/voeux/voeux.component';
import { EduprofilComponent } from './troixieme-interface/eduprofil/eduprofil.component';
import { EnsprofilComponent } from './deuxieme-interface/ensprofil/ensprofil.component';
import { NotificationComponent } from './troixieme-interface/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    NiveauxComponent,
    SpecialitesComponent,
    RegimesComponent,
    DepartementsComponent,
    CoursComponent,
    NotificationsComponent,
    EnseignantsComponent,
    EtudiantsComponent,
    DeuxiemeInterfaceComponent,
    CourComponent,
    DevoirComponent,
    QuizComponent,
    MessageComponent,
    ChapitreComponent,
    TroixiemeInterfaceComponent,
    TroixiemeInterfaceComponent,
    CourSuivieComponent,
    QuizRepondComponent,
    MessageEnvoyerComponent,
    DevoirRealiserComponent,
    VoeuxComponent,
    EduprofilComponent,
    EnsprofilComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }