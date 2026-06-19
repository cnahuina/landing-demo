import { Component, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CountUpDirective } from './count-up.directive';

@Component({
  standalone: true,
  imports: [CountUpDirective],
  template: `<strong [appCountUp]="value"></strong>`,
})
class HostComponent {
  value = '';
}

describe('CountUpDirective', () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    // Forzamos prefers-reduced-motion para que la directiva pinte el valor
    // final de forma síncrona (sin requestAnimationFrame).
    window.matchMedia = ((query: string) =>
      ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList) as typeof window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  function render(value: string): { fixture: ComponentFixture<HostComponent>; text: () => string } {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.value = value;
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('strong') as HTMLElement;
    return { fixture, text: () => el.textContent ?? '' };
  }

  it('renderiza un entero simple', () => {
    expect(render('12').text()).toBe('12');
  });

  it('conserva el prefijo "+" y el sufijo "k"', () => {
    expect(render('+740k').text()).toBe('+740k');
  });

  it('conserva un sufijo de porcentaje', () => {
    expect(render('98%').text()).toBe('98%');
  });

  it('re-renderiza al cambiar el valor (cambio de año)', () => {
    const { fixture, text } = render('+33k');
    expect(text()).toBe('+33k');

    // Simulamos el cambio de input (p. ej. al seleccionar otro año) invocando
    // ngOnChanges directamente sobre la instancia de la directiva.
    const directive = fixture.debugElement
      .query(By.directive(CountUpDirective))
      .injector.get(CountUpDirective);
    directive.value = '+49k';
    directive.ngOnChanges({
      value: new SimpleChange('+33k', '+49k', false),
    });

    expect(text()).toBe('+49k');
  });
});
