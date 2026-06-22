import { Component, HostListener, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {
  /**
   * Endpoint AJAX de FormSubmit.co. Los tickets llegan a este correo.
   * Nota: el primer envío dispara un correo de activación de FormSubmit que
   * hay que confirmar una sola vez.
   */
  private readonly endpoint = 'https://formsubmit.co/ajax/bricks@cpsaa.com.pe';

  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  readonly ticketTypes = ['Bug report', 'Solicitud de componente', 'Mejora', 'Consulta general'];

  submitted = false;
  submitting = false;
  errorMessage = '';
  typeMenuOpen = false;

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    type: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
    // Honeypot anti-spam: debe quedar vacío (oculto en la UI).
    _honey: ['']
  });

  toggleTypeMenu(): void {
    this.typeMenuOpen = !this.typeMenuOpen;
  }

  selectType(type: string): void {
    this.form.controls.type.setValue(type);
    this.form.controls.type.markAsTouched();
    this.typeMenuOpen = false;
  }

  @HostListener('document:click')
  closeTypeMenu(): void {
    this.typeMenuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.typeMenuOpen = false;
  }

  submit(): void {
    if (this.submitting) {
      return;
    }

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, type, description, _honey } = this.form.getRawValue();

    // Si el honeypot trae valor, lo tratamos como bot: simulamos éxito sin enviar.
    if (_honey) {
      this.submitted = true;
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const payload = {
      email,
      type,
      description,
      _subject: `Nuevo ticket Bricks: ${type}`,
      _template: 'table',
      _captcha: 'false'
    };

    this.http.post<{ success?: string | boolean; message?: string }>(this.endpoint, payload).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        this.form.reset({ email: '', type: '', description: '', _honey: '' });
      },
      error: () => {
        this.submitting = false;
        this.errorMessage =
          'No pudimos enviar tu ticket. Inténtalo de nuevo o escríbenos a bricks@cpsaa.com.pe.';
      }
    });
  }
}
