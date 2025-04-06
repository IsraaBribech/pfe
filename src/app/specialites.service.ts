import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class SpecialitesService {
  private apiUrl = 'http://localhost:5000/api/specialites';

  constructor(private http: HttpClient) {}

  getSpecialites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`)
  }

  // Assurez-vous que cette méthode est correcte pour votre API
  getSpecialitesByDepartement(departement: string): Observable<any[]> {
    // Modifiez cette URL si nécessaire pour correspondre à votre API
    return this.http.get<any[]>(`${this.apiUrl}?department=${departement}`)
  }

  addSpecialite(specialiteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, specialiteData)
  }
}