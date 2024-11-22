import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent {
  public singInUp: boolean = false;
  @Output() sendCloseCommand: EventEmitter<boolean> = new EventEmitter();

  singIn() {
    this.singInUp = false;
  }
  singUp() {
    this.singInUp = true;
  }
  sendAnswerFromAuth(): void {
    this.sendCloseCommand.emit(false);
  }

  public authorization: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  authorize() {
    console.log(this.authorization);
  }

  public registration: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });

  register() {
    console.log(this.authorization);
  }
}
