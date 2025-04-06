import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"


@Injectable({
  providedIn: "root",
})
export class CourService {
  getCourById(_id: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  deleteCour(id: string): Observable<any> {
    // Logic to delete the course
    return this.http.delete<any>(`${this.apiUrl}/cours/${id}`);
  }
  updateCour(_id: string, courData: any, arg2: File | undefined): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getChapitresStats(id: string): Observable<{ total: number }> {
    throw new Error('Method not implemented.');
  }
  private apiUrl = "http://localhost:5000/api/cour"

  constructor(private http: HttpClient) {}

  getCoursByTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?teacherId=${teacherId}`);
  }

  getCoursByFilters(filters: any): Observable<any[]> {
    const queryParams = new URLSearchParams()

    if (filters.departement) {
      queryParams.append("departement", filters.departement)
    }
    if (filters.niveau) {
      queryParams.append("niveau", filters.niveau)
    }
    if (filters.specialite) {
      queryParams.append("specialite", filters.specialite)
    }

    const url = `${this.apiUrl}?${queryParams.toString()}`
    return this.http.get<any[]>(url)
  }

  addCour(courData: any, file?: File): Observable<any> {
    const formData = new FormData()

    Object.keys(courData).forEach((key) => {
      formData.append(key, courData[key])
    })

    if (file) {
      formData.append("file", file, file.name)
    }

    return this.http.post(`${this.apiUrl}`, formData)
  }
}