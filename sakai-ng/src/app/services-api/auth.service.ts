import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

interface LoginRequest {
  userid: string;
  password: string;
}

interface RegisterRequest {
  userid: string;
  nama: string;
  email: string;
  password: string;
  kdgroup: string;
}

export interface UserResponse {
  userid: string;
  nama?: string;
  email?: string;
  kdgroup: string;
  password?: string; // ← jadikan optional
  idupt?: number;
  idpeg?: number;
  nik?: string;
  createdate?: Date;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5056/api/auth';

  // --- state user login ---
  private currentUserSubject = new BehaviorSubject<UserResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data, { withCredentials: true });
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { withCredentials: true });
  }

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.apiUrl}/users`, { withCredentials: true });
  }

  updateUser(userid: string, data: Partial<UserResponse>): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userid}`, data, { withCredentials: true });
  }

  deleteUser(userid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userid}`, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  getLoggedUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, { withCredentials: true });
  }

 // panggil endpoint /me yang sudah ada
  getCurrentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/me`, { withCredentials: true });
  }

   /** simpan user login ke BehaviorSubject */
  loadCurrentUser(): void {
    this.getCurrentUser().subscribe({
      next: (user) => this.currentUserSubject.next(user),
      error: () => this.currentUserSubject.next(null),
    });
  }

  /** akses sinkron (misal langsung butuh userid) */
  get currentUserValue(): UserResponse | null {
    return this.currentUserSubject.value;
  }

}
