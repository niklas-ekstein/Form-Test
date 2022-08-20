import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
      'username' : new FormControl<string|null>(null, Validators.required),
      'email' : new FormControl<string|null>(null, [Validators.required, Validators.email]),
      // 'gender' : new FormControl<string|null>('male', Validators.required)
    })
    });
  }
  onSubmit() {
    //if (this.signupForm.value.username) {
      console.log(this.signupForm.value.username.length)
    //}
      console.log(this.signupForm.value.email.length)

      console.log(this.signupForm.value.email.length)
  }
}
