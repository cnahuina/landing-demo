import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ImpactComponent } from './impact.component';

const MOCK = {
  companies: [
    { name: 'Pacasmayo', logo: 'Logo.svg' },
    { name: 'Bizner', logo: 'bizner.svg' },
  ],
  years: [
    {
      year: 2025,
      stats: [{ icon: 'team', label: 'Productos', value: '12', growth: '+10%' }],
    },
    {
      year: 2024,
      stats: [{ icon: 'team', label: 'Productos', value: '9', growth: '+8%' }],
    },
  ],
};

describe('ImpactComponent', () => {
  let component: ImpactComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImpactComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const fixture = TestBed.createComponent(ImpactComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne('impact.json').flush(MOCK);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('carga compañías y años, y selecciona el primer año por defecto', () => {
    expect(component.companies().length).toBe(2);
    expect(component.years().length).toBe(2);
    expect(component.selectedYear()).toBe(2025);
  });

  it('expone las stats del año seleccionado', () => {
    expect(component.stats().length).toBe(1);
    expect(component.stats()[0].value).toBe('12');
  });

  it('selectYear cambia el año, actualiza las stats y cierra el menú', () => {
    component.toggleMenu();
    expect(component.menuOpen()).toBe(true);

    component.selectYear(2024);

    expect(component.selectedYear()).toBe(2024);
    expect(component.stats()[0].value).toBe('9');
    expect(component.menuOpen()).toBe(false);
  });

  it('toggleMenu alterna la visibilidad del menú', () => {
    expect(component.menuOpen()).toBe(false);
    component.toggleMenu();
    expect(component.menuOpen()).toBe(true);
    component.toggleMenu();
    expect(component.menuOpen()).toBe(false);
  });
});
