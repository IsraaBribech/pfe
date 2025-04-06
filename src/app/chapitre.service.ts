import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ChapitreService {
  private apiUrl = 'http://localhost:5000/api/chapitre'; // URL de ton backend Node.js

  constructor(private http: HttpClient) {}

  getChapitres(courId?: string): Observable<any[]> {
    const url = courId ? `${this.apiUrl}/chapitres?cour=${courId}` : `${this.apiUrl}/chapitres`
    return this.http.get<any[]>(url)
  }

  addChapitre(chapitreData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chapitres`, chapitreData)
  }
}

