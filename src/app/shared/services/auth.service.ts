import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(key: string): string {
    return sessionStorage.getItem(key) || "token_not_found";
  }

  setToken(key: string, value: string): void {
    sessionStorage.setItem(key, value)
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  clearToken(){
    sessionStorage.removeItem("authToken")
  }
}