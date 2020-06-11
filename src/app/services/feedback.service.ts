import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FEEDBACK_URL } from '../shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient
  ) { }

  uploadFeedback = (feedback: any) => {
    return this.http.post(`${FEEDBACK_URL}/addFeedback`, feedback)
      .pipe(res => res);
  }
}
