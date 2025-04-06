import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeacherStatsService {
  private apiUrl = 'http://localhost:5000/api/statens'; // URL de ton backend Node.js
  constructor(private http: HttpClient) { }

  getTeacherStats(teacherId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/teacher/stats/${teacherId}`);
  }

  getRecentActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activities`);
  }
}