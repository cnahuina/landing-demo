import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Stat {
  icon: string;
  label: string;
  value: string;
  growth: string;
}

interface YearData {
  year: number;
  stats: Stat[];
}

interface Company {
  name: string;
  logo: string;
}

interface ImpactData {
  companies: Company[];
  years: YearData[];
}

@Component({
  selector: 'app-impact',
  standalone: true,
  templateUrl: './impact.component.html',
  styleUrl: './impact.component.scss'
})
export class ImpactComponent {
  private readonly http = inject(HttpClient);

  readonly companies = signal<Company[]>([]);
  readonly years = signal<YearData[]>([]);
  readonly selectedYear = signal<number | null>(null);
  readonly menuOpen = signal(false);

  readonly stats = computed<Stat[]>(() => {
    const year = this.selectedYear();
    const found = this.years().find((y) => y.year === year);
    return found?.stats ?? [];
  });

  constructor() {
    this.http.get<ImpactData>('impact.json').subscribe((data) => {
      const years = data?.years ?? [];
      this.companies.set(data?.companies ?? []);
      this.years.set(years);
      if (years.length) {
        this.selectedYear.set(years[0].year);
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  selectYear(year: number): void {
    this.selectedYear.set(year);
    this.menuOpen.set(false);
  }
}
