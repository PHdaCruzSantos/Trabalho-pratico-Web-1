import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, switchMap, map } from 'rxjs';
import { User, Role } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Inicializa o usuário se tiver token
    const token = this.getToken();
    if (token) {
      this.getMe().subscribe({
        error: () => {
          // Se falhar, limpa o token inválido
          this.logout();
        },
      });
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(({ token }) => localStorage.setItem('token', token)),
      switchMap(() => this.getMe())
    );
  }

  register(name: string, email: string, password: string, role: Role): Observable<User> {
    return this.http
      .post<{ user: User, token: string }>(`${this.apiUrl}/register`, { name, email, password, role })
      .pipe(
        tap(({ token }) => localStorage.setItem('token', token)),
        switchMap(() => this.getMe())
      );
  }

  updateMe(data: { name?: string; email?: string }): Observable<User> {
    return this.http.put<{ user: User }>(`${this.apiUrl}/me`, data).pipe(
      map((response) => response.user),
      tap((user) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  updateProfile(data: { name?: string; email?: string }): Observable<User> {
    return this.updateMe(data);
  }

  getMe(): Observable<User> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/me`).pipe(
      map((response) => response.user),
      tap((user) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
