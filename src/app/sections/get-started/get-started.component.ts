import { Component } from '@angular/core';

@Component({
  selector: 'app-get-started',
  standalone: true,
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss'
})
export class GetStartedComponent {
  readonly cards = [
    {
      icon: 'design',
      iconColor: '#FF9F1C',
      title: 'Soy Diseñador',
      description: 'Domina nuestras librerías en Figma y utiliza componentes pensados para crear experiencias coherentes en tiempo récord.',
      cta: 'Guía de diseño'
    },
    {
      icon: 'code',
      iconColor: '#b91312',
      title: 'Soy Desarrollador',
      description: 'Configura tu entorno en minutos e implementa componentes robustos y testeados, listos para escalar en producción.',
      cta: 'Guía de desarrollo'
    },
    {
      icon: 'product',
      iconColor: '#3aa76d',
      title: 'Gestión de producto',
      description: 'Aprende a integrar Bricks en el flujo de tu equipo. Te acompañamos en la implementación, estamos aquí para resolver cualquier duda o necesidad en el camino.',
      cta: 'Solicitar asesoría'
    }
  ];
}
