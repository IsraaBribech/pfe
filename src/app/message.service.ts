import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  archiveMessage(_id: string) {
    throw new Error('Method not implemented.');
  }
  deleteMessage(_id: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:5000/api/messages';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les conversations d'un utilisateur
  getConversations(userId: string, userType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conversations?userId=${userId}&userType=${userType}`);
  }

  // Récupérer une conversation spécifique
  getConversation(conversationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/conversations/${conversationId}`);
  }

  // Récupérer les messages d'une conversation
  getMessages(conversationId: string, activeTab: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conversations/${conversationId}/messages`);
  }

  // Envoyer un message
  sendMessage(conversationId: string, message: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conversations/${conversationId}/messages`, message);
  }

  // Créer une nouvelle conversation
  createConversation(conversation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conversations`, conversation);
  }

  // Marquer les messages comme lus
  markAsRead(conversationId: string, userId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/conversations/${conversationId}/read`, { userId });
  }

  // Récupérer les étudiants pour créer une nouvelle conversation
  getStudents(filters: any = {}): Observable<any[]> {
    let queryParams = '';
    
    if (filters.departement) {
      queryParams += `departement=${filters.departement}&`;
    }
    
    if (filters.niveau) {
      queryParams += `niveau=${filters.niveau}&`;
    }
    
    if (filters.specialite) {
      queryParams += `specialite=${filters.specialite}&`;
    }
    
    return this.http.get<any[]>(`http://localhost:5000/api/etudiants?${queryParams}`);
  }

  // Récupérer les groupes d'étudiants
  getGroups(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/groups?teacherId=${teacherId}`);
  }

  // Vérifier si une conversation existe déjà
  checkConversationExists(participants: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conversations/check`, { participants });
  }

  // Supprimer une conversation
  deleteConversation(conversationId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/conversations/${conversationId}`);
  }

  // Ajouter un participant à une conversation
  addParticipant(conversationId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conversations/${conversationId}/participants`, { userId });
  }

  // Supprimer un participant d'une conversation
  removeParticipant(conversationId: string, userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/conversations/${conversationId}/participants/${userId}`);
  }

  // Rechercher des conversations
  searchConversations(userId: string, searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conversations/search?userId=${userId}&term=${searchTerm}`);
  }

  // Obtenir le nombre de messages non lus
  getUnreadCount(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/unread?userId=${userId}`);
  }
}