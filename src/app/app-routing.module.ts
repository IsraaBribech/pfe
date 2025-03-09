import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NiveauxComponent } from './niveaux/niveaux.component';
import { SpecialitesComponent } from './specialites/specialites.component';
import { RegimesComponent } from './regimes/regimes.component';
import { DepartementsComponent } from './departements/departements.component';
import { CoursComponent } from './cours/cours.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdminComponent } from './admin/admin.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'enseignants', component: EnseignantsComponent },
  { path: 'etudiants', component: EtudiantsComponent },

  { path: 'niveaux', component: NiveauxComponent },
  { path: 'specialites', component: SpecialitesComponent },
  { path: 'regimes', component: RegimesComponent },
  { path: 'departements', component: DepartementsComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: '**', redirectTo: '/dashboard' } // Route pour les URL non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
