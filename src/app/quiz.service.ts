import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:5000/api/quiz';

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quizzes`);
  }

  getQuizzesByTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quizzes/teacher/${teacherId}`);
  }

  getQuizById(quizId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quizzes/${quizId}`);
  }

  addQuiz(quizData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/quizzes`, quizData);
  }

  updateQuiz(quizId: string, quizData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/quizzes/${quizId}`, quizData);
  }

  deleteQuiz(quizId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/quizzes/${quizId}`);
  }

  getQuizzesByFilters(filters: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/filters`, filters);
  }

  getQuizResults(quizId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quizzes/${quizId}/results`);
  }

  submitQuizAnswers(quizId: string, answers: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/quizzes/${quizId}/submit`, answers);
  }

  getCoursByTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/cours?teacherId=${teacherId}`);
  }

  // Nouvelle méthode pour obtenir le statut d'un quiz
  getQuizStatus(dueDate: string): string {
    const today = new Date();
    const due = new Date(dueDate);
    
    if (due > today) {
      return 'Actif';
    } else {
      return 'Expiré';
    }
  }
  
  // Méthode pour obtenir les statistiques d'un quiz
  getQuizStatistics(quizId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quizzes/${quizId}/statistics`);
  }
  
  // Méthode pour obtenir les quiz par cours
  getQuizzesByCourse(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quizzes/course/${courseId}`);
  }
  
  // Méthode pour vérifier si un étudiant a déjà répondu à un quiz
  checkStudentAttempt(quizId: string, studentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quizzes/${quizId}/attempt/${studentId}`);
  }
  
  // Méthode pour obtenir les quiz par département, niveau et spécialité
  getQuizzesByDepartmentLevelSpecialty(departmentId: string, levelId: string, specialtyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quizzes/filter?departement=${departmentId}&niveau=${levelId}&specialite=${specialtyId}`);
  }
  
  // Méthode pour dupliquer un quiz existant
  duplicateQuiz(quizId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/quizzes/${quizId}/duplicate`, {});
  }
  
  // Méthode pour publier ou dépublier un quiz
  toggleQuizPublishStatus(quizId: string, isPublished: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/quizzes/${quizId}/publish`, { isPublished });
  }
  
  // Méthode pour exporter les résultats d'un quiz au format CSV
  exportQuizResults(quizId: string, format: string = 'csv'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/quizzes/${quizId}/export?format=${format}`, { responseType: 'blob' });
  }
  
  // Méthode pour importer des questions depuis un fichier
  importQuestions(quizId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/quizzes/${quizId}/import-questions`, formData);
  }
}