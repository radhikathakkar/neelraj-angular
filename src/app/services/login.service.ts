import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient
  ) { }
  login = (userData) => {
    return this.http.post(`${BASE_URL}/login`, userData)
      .pipe(res => res);
  }

  isLoggedIn = (token: string) => {
    if (token === '' || token === null || token === undefined) {
      return true;
    }
    return false;
  }


}
