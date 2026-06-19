import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SupportComponent } from './support.component';

const ENDPOINT = 'https://formsubmit.co/ajax/bricks@cpsaa.com.pe';

describe('SupportComponent', () => {
  let component: SupportComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SupportComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function fillValid(): void {
    component.form.patchValue({
      email: 'persona@empresa.com',
      type: 'Bug report',
      description: 'Esto es una descripción suficientemente larga.',
    });
  }

  it('no envía si el formulario es inválido y marca los campos como touched', () => {
    component.submit();

    expect(component.submitted).toBe(false);
    expect(component.form.touched).toBe(true);
    httpMock.expectNone(ENDPOINT);
  });

  it('envía un POST a FormSubmit y marca submitted al tener éxito', () => {
    fillValid();
    component.submit();

    const req = httpMock.expectOne(ENDPOINT);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.email).toBe('persona@empresa.com');
    expect(req.request.body.type).toBe('Bug report');
    expect(req.request.body._captcha).toBe('false');

    req.flush({ success: 'true' });

    expect(component.submitting).toBe(false);
    expect(component.submitted).toBe(true);
  });

  it('si el honeypot trae valor, no envía pero simula éxito', () => {
    fillValid();
    component.form.patchValue({ _honey: 'soy-un-bot' });
    component.submit();

    expect(component.submitted).toBe(true);
    httpMock.expectNone(ENDPOINT);
  });

  it('muestra un mensaje de error si la petición falla', () => {
    fillValid();
    component.submit();

    const req = httpMock.expectOne(ENDPOINT);
    req.flush('error', { status: 500, statusText: 'Server Error' });

    expect(component.submitting).toBe(false);
    expect(component.submitted).toBe(false);
    expect(component.errorMessage).toContain('No pudimos enviar');
  });
});
