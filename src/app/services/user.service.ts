import { Injectable } from '@angular/core';
import { BASE_URL, FILE_URL } from '../shared/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  getUserData = () => {
    return this.http.get(`${BASE_URL}/userData`)
      .pipe(res => res);
  }

  checkEmail = (email: string) => {
    return this.http.post(`${BASE_URL}/validateEmail`, email)
      .pipe(res => res);
  }

  registerUser = (user) => {
    return this.http.post(`${BASE_URL}/register`, user)
      .pipe(res => res);
  }

  getUserProfile = (id: string) => {
    return this.http.get(`${BASE_URL}/showProfile/${id}`)
      .pipe(res => res);
  }

  getUserById = (id: string) => {
    return this.http.get(`${BASE_URL}/showProfile/${id}`)
      .pipe(map(res => res));
  }

  validateUserId = (id: string) => {
    return this.http.get(`${BASE_URL}/${id}`)
      .pipe(map(res => res));
  }

  uploadUserImg = (id: string, file) => {
    return this.http.put(`${BASE_URL}/uploadImage/${id}`, file)
      .pipe(res => res);
  }

  getUserImageById = (id: string) => {
    return this.http.get(`${BASE_URL}/images/${id}`)
      .pipe(map(res => res));
  }

  updateUserProfile = (id: string, user: any) => {
    return this.http.post(`${BASE_URL}/updateProfile/${id}`, user)
      .pipe(res => res);
  }

  deleteUserProfile = (id: string) => {
    return this.http.delete(`${BASE_URL}/deleteProfile/${id}`)
      .pipe(res => res);
  }
}
