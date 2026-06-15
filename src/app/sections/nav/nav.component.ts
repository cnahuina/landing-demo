import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  menuOpen = false;
  scrolled = false;
  activeSection = '';

  readonly navLinks = [
    { label: 'Componentes', target: 'componentes' },
    { label: 'Guías de estilo', target: 'guias' },
    { label: 'Adopción', target: 'adopcion' },
    { label: 'Soporte', target: 'soporte' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 40;
  }

  scroll(target: string): void {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    this.activeSection = target;
    this.menuOpen = false;
  }

  toggle(): void {
    this.menuOpen = !this.menuOpen;
  }
}
