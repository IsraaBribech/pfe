import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { NiveauxComponent } from "./niveaux/niveaux.component"
import { SpecialitesComponent } from "./specialites/specialites.component"
import { RegimesComponent } from "./regimes/regimes.component"
import { DepartementsComponent } from "./departements/departements.component"
import { CoursComponent } from "./cours/cours.component"
import { AdminComponent } from "./admin/admin.component"
import { EnseignantsComponent } from "./enseignants/enseignants.component"
import { EtudiantsComponent } from "./etudiants/etudiants.component"
import { DeuxiemeInterfaceComponent } from "./deuxieme-interface/deuxieme-interface.component"
import { TroixiemeInterfaceComponent } from "./troixieme-interface/troixieme-interface.component"
import { CourComponent } from "./deuxieme-interface/cour/cour.component"
import { DevoirComponent } from "./deuxieme-interface/devoir/devoir.component"
import { QuizComponent } from "./deuxieme-interface/quiz/quiz.component"
import { MessageComponent } from "./deuxieme-interface/message/message.component"
import { VoeuxComponent } from "./deuxieme-interface/voeux/voeux.component"


// Composants de l'interface étudiant
import { CourSuivieComponent } from "./troixieme-interface/cour-suivie/cour-suivie.component"
import { DevoirRealiserComponent } from "./troixieme-interface/devoir-realiser/devoir-realiser.component"
import { QuizRepondComponent } from "./troixieme-interface/quiz-repond/quiz-repond.component"
import { MessageEnvoyerComponent } from "./troixieme-interface/message-envoyer/message-envoyer.component"
import { EduprofilComponent } from "./troixieme-interface/eduprofil/eduprofil.component"
import { NotificationComponent } from "./troixieme-interface/notification/notification.component";

const routes: Routes = [
  { path: "", redirectTo: "/admin", pathMatch: "full" },
  { path: "admin", component: AdminComponent },
  { path: "enseignants", component: EnseignantsComponent },
  { path: "etudiants", component: EtudiantsComponent },
  { path: "deuxieme-interface", component: DeuxiemeInterfaceComponent },
  { path: "troixieme-interface", component: TroixiemeInterfaceComponent }, // Interface étudiant
  { path: "dashboard", component: DeuxiemeInterfaceComponent }, // Utiliser DeuxiemeInterfaceComponent comme dashboard
  { path: "niveaux", component: NiveauxComponent },
  { path: "specialites", component: SpecialitesComponent },
  { path: "regimes", component: RegimesComponent },
  { path: "departements", component: DepartementsComponent },
  { path: "cours", component: CoursComponent }, // Route existante pour CoursComponent
  { path: "cour", component: CourComponent },
  { path: "devoir", component: DevoirComponent },
  { path: "quiz", component: QuizComponent },
  { path: "message", component: MessageComponent },
  { path: "voeux", component: VoeuxComponent },

  // Routes pour l'interface étudiant
  { path: "troixieme-interface/cour-suivie", component: CourSuivieComponent },
  { path: "troixieme-interface/devoir-realiser", component: DevoirRealiserComponent },
  { path: "troixieme-interface/quiz-repond", component: QuizRepondComponent },
  { path: "troixieme-interface/message-envoyer", component: MessageEnvoyerComponent },
  { path: "troixieme-interface/eduprofil", component: EduprofilComponent },
  { path: "troixieme-interface/notification", component: NotificationComponent },
  { path: "**", redirectTo: "/dashboard" }, // Route pour les URL non trouvées
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

