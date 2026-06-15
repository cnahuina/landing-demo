import { Component } from '@angular/core';

@Component({
  selector: 'app-guidelines',
  standalone: true,
  templateUrl: './guidelines.component.html',
  styleUrl: './guidelines.component.scss'
})
export class GuidelinesComponent {
  readonly items = [
    { label: 'Color', icon: 'color' },
    { label: 'Tipografía', icon: 'type' },
    { label: 'Icon', icon: 'icon' },
    { label: 'Layout', icon: 'layout' },
    { label: 'Calidad', icon: 'star' },
    { label: 'Accesibilidad', icon: 'access' },
    { label: 'Contenido', icon: 'content' },
    { label: 'Datos', icon: 'data' }
  ];
}
