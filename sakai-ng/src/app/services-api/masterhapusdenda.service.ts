import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Masterhapusdenda {
    idhapusdenda: number;
    jenis: string;
    uraian: string;
    awal: string | Date | null;
    akhir: string | Date | null;
    nilai: number | null;
    satuan: string;
    ket?: string | null;
    status?: string | null;
    createby?: string | null;
    createdate?: string | null;
    updateby?: string | null;
    updatedate?: string | null;
}


@Injectable({ providedIn: 'root' })
export class MasterhapusdendaService {
    private apiUrl = 'http://localhost:5056/api/masterhapusdendum';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Masterhapusdenda[]> {
        return this.http.get<Masterhapusdenda[]>(this.apiUrl);
    }

    create(data: Masterhapusdenda): Observable<Masterhapusdenda> {
        return this.http.post<Masterhapusdenda>(this.apiUrl, data);
    }

    update(id: number, data: Masterhapusdenda): Observable<Masterhapusdenda> {
        return this.http.put<Masterhapusdenda>(`${this.apiUrl}/${id}`, data);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
