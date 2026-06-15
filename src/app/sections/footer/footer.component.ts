import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly links = [
    { label: 'Sobre Bricks', href: '#' },
    { label: 'Foundations', href: '#' },
    { label: 'Components', href: '#componentes' },
    { label: 'Lineamientos', href: '#guias' }
  ];
}
