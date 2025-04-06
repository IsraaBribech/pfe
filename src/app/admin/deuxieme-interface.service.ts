import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeuxiemeInterfaceService {
  private apiUrl = environment.apiUrl; // Assurez-vous d'avoir défini cette URL dans votre fichier environment

  constructor(private http: HttpClient) { }

  // Statistiques
  getTeacherStats(id: string): Observable<any> {
    // Mock implementation
    return of({
      coursStats: { total: 5 },
      chapitreStats: { total: 10 },
      quizStats: { total: 3 },
      assignmentStats: { total: 4 },
      messageStats: { total: 20, unread: 5 }
    });
  }

  // Cours
  getCourses(id: string): Observable<any[]> {
    // Mock implementation
    return of([
      { _id: '1', title: 'Course 1' },
      { _id: '2', title: 'Course 2' }
    ]);
  }

  addCourse(courseData: any): Observable<any> {
    // Mock implementation
    return of({ course: { _id: 'newCourseId' } });
  }

  // Chapitres
  getChapters(): Observable<any[]> {
    // Mock implementation
    return of([
      { _id: '1', title: 'Chapter 1', course: { title: 'Course 1' }, createdAt: new Date() },
      { _id: '2', title: 'Chapter 2', course: { title: 'Course 2' }, createdAt: new Date() }
    ]);
  }

  addChapter(chapterData: any): Observable<any> {
    // Mock implementation
    return of({ chapter: { _id: 'newChapterId' } });
  }

  // Quiz
  getQuizzes(): Observable<any[]> {
    // Mock implementation
    return of([
      { _id: '1', title: 'Quiz 1', course: { title: 'Course 1' }, questions: [] },
      { _id: '2', title: 'Quiz 2', course: { title: 'Course 2' }, questions: [] }
    ]);
  }

  addQuiz(quizData: any): Observable<any> {
    // Mock implementation
    return of({ quiz: { _id: 'newQuizId' } });
  }

  // Devoirs
  getAssignments(): Observable<any[]> {
    // Mock implementation
    return of([
      { _id: '1', title: 'Assignment 1', course: { title: 'Course 1' }, dueDate: new Date() },
      { _id: '2', title: 'Assignment 2', course: { title: 'Course 2' }, dueDate: new Date() }
    ]);
  }

  addAssignment(assignmentData: any): Observable<any> {
    // Mock implementation
    return of({ assignment: { _id: 'newAssignmentId' } });
  }

  // Messages
  getMessages(id: string): Observable<any> {
    // Mock implementation
    return of({
      sent: [
        { _id: '1', recipient: 'all', subject: 'Subject 1', content: 'Content 1', createdAt: new Date() },
        { _id: '2', recipient: 'admin', subject: 'Subject 2', content: 'Content 2', createdAt: new Date() }
      ]
    });
  }

  sendMessage(messageData: any): Observable<any> {
    // Mock implementation
    return of({ messageData: { _id: 'newMessageId' } });
  }

  markMessageAsRead(messageId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/messages/${messageId}/read`, {});
  }

  // Activités récentes
  getRecentActivities(): Observable<any[]> {
    // Mock implementation
    return of([
      { activity: 'Activity 1' },
      { activity: 'Activity 2' }
    ]);
  }
}