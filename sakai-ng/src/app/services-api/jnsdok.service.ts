import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Jnsdok {
    kddok: string,
    namadok: string,
    kterangan: string,
    createby: string,
    createdate: string,
    updateby: string,
    updatedate: string,
}

@Injectable({ providedIn: 'root' })
export class JnsdokService {
    private apiUrl = 'http://localhost:5056/api/jnsdok';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Jnsdok[]> {
        return this.http.get<Jnsdok[]>(this.apiUrl);
    }
}
