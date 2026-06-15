import { Component } from '@angular/core';

@Component({
  selector: 'app-featured',
  standalone: true,
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss'
})
export class FeaturedComponent {
  activeTab: 'diseno' | 'desarrollo' = 'diseno';

  readonly content = {
    diseno: {
      previewLabel: 'Preview: bds-checkbox',
      footer: 'Accede a componentes modulares.',
      title: 'Coherencia sin esfuerzo',
      description:
        'Acelera el flujo de trabajo con nuestros componentes validados. Libera tiempo para la estrategia de producto mientras el sistema asegura que cada detalle visual esté siempre en su lugar.'
    },
    desarrollo: {
      previewLabel: 'Preview: Install',
      footer:
        'Implementa componentes y estilos en segundos mediante paquetes npm optimizados.',
      title: 'Velocidad en el despliegue',
      description:
        'Lleva tus diseños a código sin complicaciones. Nuestros componentes en código son el reflejo exacto de tus archivos de diseño. Ahorra tiempo de maquetación y asegura un resultado fiel en cada despliegue.'
    }
  };

  setTab(tab: 'diseno' | 'desarrollo'): void {
    this.activeTab = tab;
  }

  get c() {
    return this.content[this.activeTab];
  }
}
