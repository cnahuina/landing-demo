import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  atBottom = false;
  activeSection = 'inicio';
  fabOpen = false;

  toggleFab(): void {
    this.fabOpen = !this.fabOpen;
  }

  readonly sections = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'adopcion', label: 'Adopción' },
    { id: 'componentes', label: 'Componentes' },
    { id: 'nuestros-componentes', label: 'Nuestros componentes' },
    { id: 'guias', label: 'Guías de estilo' },
    { id: 'impacto', label: 'Impacto' },
    { id: 'changelog', label: 'Changelog' },
    { id: 'soporte', label: 'Soporte' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollBottom = window.scrollY + window.innerHeight;
    this.atBottom = scrollBottom >= document.documentElement.scrollHeight - 40;
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const offset = window.innerHeight * 0.4;
    let current = this.sections[0].id;

    for (const section of this.sections) {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top <= offset) {
        current = section.id;
      }
    }

    this.activeSection = current;
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.activeSection = id;
  }

  scrollToNext(): void {
    if (this.atBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[id]')
    );
    const threshold = 10;
    const next = sections.find(
      (el) => el.getBoundingClientRect().top > threshold
    );

    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }
}
