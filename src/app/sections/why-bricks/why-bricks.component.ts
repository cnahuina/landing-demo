import { Component } from '@angular/core';

@Component({
  selector: 'app-why-bricks',
  standalone: true,
  templateUrl: './why-bricks.component.html',
  styleUrl: './why-bricks.component.scss'
})
export class WhyBricksComponent {
  readonly cards = [
    {
      icon: 'eye',
      title: 'Experiencia unificada',
      description: 'Aseguramos una experiencia de marca impecable en todos nuestros productos.'
    },
    {
      icon: 'bolt',
      title: 'Agilidad de entrega',
      description: 'Componentes optimizados que eliminan procesos repetitivos y aceleran el lanzamiento.'
    },
    {
      icon: 'team',
      title: 'Sinergia en escala',
      description: 'Un flujo de trabajo unificado que conecta el diseño con el desarrollo.'
    }
  ];
}
