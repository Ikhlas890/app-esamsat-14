import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Masterflow {
    kdflow: string;
    nmflow: string;
    pkb?: string | null;
    bbn1?: string | null;
    bbn2?: string | null;
    swd?: string | null;
    atbKen?: string | null;
    flowJr?: string | null;
    stnkbaru?: string | null;
    tnkb?: string | null;
    sahstnk?: string | null;
    perpanjangstnk?: string | null;
    potongan?: string | null;
    bataslayanan?: number | null;
    satuan?: string | null;
    status?: string | null;
    createby?: string | null;
    createdate?: string | null;
    updateby?: string | null;
    updatedate?: string | null;
}


@Injectable({ providedIn: 'root' })
export class MasterflowService {
    private apiUrl = 'http://localhost:5056/api/masterflow';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Masterflow[]> {
        return this.http.get<Masterflow[]>(this.apiUrl);
    }

    create(data: Masterflow): Observable<Masterflow> {
        return this.http.post<Masterflow>(this.apiUrl, data);
    }


    update(id: string, data: Masterflow): Observable<Masterflow> {
        return this.http.put<Masterflow>(`${this.apiUrl}/${id}`, data);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
