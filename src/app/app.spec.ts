import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    // El título se reparte en varios <span>, por lo que textContent va sin
    // espacios entre líneas; comprobamos los fragmentos clave.
    const title = compiled.querySelector('h1')?.textContent ?? '';
    expect(title).toContain('Nuestra forma');
    expect(title).toContain('construir');
  });

  it('debe renderizar todas las secciones principales', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    for (const selector of [
      'app-nav',
      'app-hero',
      'app-why-bricks',
      'app-get-started',
      'app-featured',
      'app-guidelines',
      'app-impact',
      'app-changelog',
      'app-support',
      'app-footer',
      'app-cursor',
    ]) {
      expect(compiled.querySelector(selector)).toBeTruthy();
    }
  });
});
