import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ajout de ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Composants administratifs
import { AdminComponent } from './admin/admin.component';
import { NiveauxComponent } from './niveaux/niveaux.component';
import { SpecialitesComponent } from './specialites/specialites.component';
import { RegimesComponent } from './regimes/regimes.component';
import { DepartementsComponent } from './departements/departements.component';
import { CoursComponent } from './cours/cours.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';

// Composants de l'interface enseignant
import { DeuxiemeInterfaceComponent } from './deuxieme-interface/deuxieme-interface.component';
import { CourComponent } from './deuxieme-interface/cour/cour.component';
import { DevoirComponent } from './deuxieme-interface/devoir/devoir.component';
import { QuizComponent } from './deuxieme-interface/quiz/quiz.component';
import { MessageComponent } from './deuxieme-interface/message/message.component';
import { VoeuxComponent } from './deuxieme-interface/voeux/voeux.component';
import { EnsprofilComponent } from './deuxieme-interface/ensprofil/ensprofil.component';

// Composants de l'interface étudiant
import { TroixiemeInterfaceComponent } from './troixieme-interface/troixieme-interface.component';
import { CourSuivieComponent } from './troixieme-interface/cour-suivie/cour-suivie.component';
import { DevoirRealiserComponent } from './troixieme-interface/devoir-realiser/devoir-realiser.component';
import { QuizRepondComponent } from './troixieme-interface/quiz-repond/quiz-repond.component';
import { MessageEnvoyerComponent } from './troixieme-interface/message-envoyer/message-envoyer.component';
import { EduprofilComponent } from './troixieme-interface/eduprofil/eduprofil.component';
import { EdunotificationComponent } from './troixieme-interface/edunotification/edunotification.component';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NiveauxComponent,
    SpecialitesComponent,
    RegimesComponent,
    DepartementsComponent,
    CoursComponent,
    EnseignantsComponent,
    EtudiantsComponent,
    DeuxiemeInterfaceComponent,
    CourComponent,
    DevoirComponent,
    QuizComponent,
    MessageComponent,
    VoeuxComponent,
    EnsprofilComponent,
    TroixiemeInterfaceComponent,
    CourSuivieComponent,
    DevoirRealiserComponent,
    QuizRepondComponent,
    MessageEnvoyerComponent,
    EduprofilComponent,
    EdunotificationComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Ajout de ReactiveFormsModule pour les formulaires réactifs
    CommonModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Pour les éléments personnalisés
})
export class AppModule { }