import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Masterjabttd {
    idjabttd: number;
    idpegawai?: number | null;
    kddok: string;
    jabatan: string;
    ket?: string | null;
    status: string;
    createby?: string | null;
    createdate?: string | null;
    updateby?: string | null;
    updatedate?: string | null;
}


@Injectable({ providedIn: 'root' })
export class MasterjabttdService {
    private apiUrl = 'http://localhost:5056/api/masterjabttd';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Masterjabttd[]> {
        return this.http.get<Masterjabttd[]>(this.apiUrl);
    }

    create(data: Masterjabttd): Observable<Masterjabttd> {
        return this.http.post<Masterjabttd>(this.apiUrl, data);
    }


    update(id: number, data: Masterjabttd): Observable<Masterjabttd> {
        return this.http.put<Masterjabttd>(`${this.apiUrl}/${id}`, data);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
