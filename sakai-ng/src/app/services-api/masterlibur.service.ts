import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Masterlibur {
    idlibur: number;
    idkabkota?: number | null;
    level: string;
    tanggal: string | Date | null;
    namalibur: string;
    ket?: string | null;
    createby?: string | null;
    createdate?: string | null;
    updateby?: string | null;
    updatedate?: string | null;
}


@Injectable({ providedIn: 'root' })
export class MasterliburService {
    private apiUrl = 'http://localhost:5056/api/masterlibur';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Masterlibur[]> {
        return this.http.get<Masterlibur[]>(this.apiUrl);
    }

    create(data: Masterlibur): Observable<Masterlibur> {
        return this.http.post<Masterlibur>(this.apiUrl, data);
    }


    update(id: number, data: Masterlibur): Observable<Masterlibur> {
        return this.http.put<Masterlibur>(`${this.apiUrl}/${id}`, data);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
