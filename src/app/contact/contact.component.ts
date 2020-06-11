import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})


export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  subjectList: any = ['Bio-data', 'Advertisement'];
  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit(): void {
    this.createContactForm();
  }

  createContactForm = () => {
    this.contactForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['',
        Validators.compose(
          [
            Validators.required,
            Validators.email
          ]
        )
      ],
      subject: '',
      message: ''
    });
  }

  changeSubject = (value) => {
    this.contactForm.controls.subject.setValue(value);
  }

  onSubmit = () => {
    this.feedbackService.uploadFeedback(this.contactForm.value)
      .subscribe(data => {
        if (data) {
          this.resetContactForm();
          console.log(data);
        }
      });
  }

  resetContactForm = () => {
    this.contactForm.controls.firstname.setValue('');
    this.contactForm.controls.lastname.setValue('');
    this.contactForm.controls.email.setValue('');
    this.contactForm.controls.subject.setValue('');
    this.contactForm.controls.message.setValue('');
  }
}
