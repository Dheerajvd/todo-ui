// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../../environments/environment"

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get(endpoint: string, params?: HttpParams) {
        return new Promise((resolve, reject) => {
            this.getMethod(endpoint, params).subscribe((data) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }
    getMethod<T>(endpoint: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}${endpoint}`, { params })
            .pipe(
                catchError(this.handleError)
            );
    }

    post(endpoint: string, body: any) {
        return new Promise((resolve, reject) => {
            this.postMethod(endpoint, body).subscribe((data) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }

    postMethod<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}${endpoint}`, body, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    put(endpoint: string, body: any) {
        return new Promise((resolve, reject) => {
            this.putMethod(endpoint, body).subscribe((data) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }

    putMethod<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}${endpoint}`, body, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(endpoint: string, params?: HttpParams) {
        return new Promise((resolve, reject) => {
            this.deleteMethod(endpoint, params).subscribe((data) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }

    deleteMethod<T>(endpoint: string, params?: HttpParams): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { params })
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any): Observable<never> {
        console.error('API Error:', error);
        throw error;
    }
}
