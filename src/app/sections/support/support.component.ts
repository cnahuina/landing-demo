import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {
  readonly ticketTypes = ['Bug report', 'Solicitud de componente', 'Mejora', 'Consulta general'];
  submitted = false;
  readonly form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.submitted = true;
    } else {
      this.form.markAllAsTouched();
    }
  }
}
