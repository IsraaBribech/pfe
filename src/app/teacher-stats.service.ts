import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class TeacherStatsService {
  private apiUrl = 'http://localhost:5000/api/teacher-stats';

  constructor(private http: HttpClient) {}

  getTeacherStats(teacherId: string): Observable<any> {
    // Si l'API n'est pas encore implémentée, on peut retourner des données fictives
    // return this.http.get<any>(`${this.apiUrl}/teacher/stats/${teacherId}`);

    // Données fictives pour le développement
    return of({
      coursStats: { total: 5 },
      chapitreStats: { total: 10 },
      quizStats: { total: 3 },
      devoirStats: { total: 4 },
      messageStats: { total: 20, unread: 5 },
    })
  }

  getRecentActivities(): Observable<any[]> {
    // Si l'API n'est pas encore implémentée, on peut retourner des données fictives
    // return this.http.get<any[]>(`${this.apiUrl}/activities`);

    // Données fictives pour le développement
    return of([
      { type: "student", text: "Devoir soumis par l'étudiant Mohamed Ali", time: "Il y a 2 heures" },
      { type: "note", text: "Notes ajoutées pour le cours Algorithmes", time: "Il y a 5 heures" },
      { type: "message", text: "Message reçu de l'administration", time: "Hier à 14:30" },
      { type: "course", text: "Document partagé dans le cours Base de données", time: "Il y a 2 jours" },
    ])
  }
}

