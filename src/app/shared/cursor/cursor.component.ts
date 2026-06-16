import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Cursor personalizado "Arrow Pointer" basado en la librería Curzr
 * (https://codepen.io/fuzionix/pen/PoRWVRg, Apache-2.0).
 *
 * La flecha sigue al puntero y rota suavemente según la dirección del
 * movimiento. Se desactiva en dispositivos táctiles y cuando el usuario
 * prefiere movimiento reducido.
 */
@Component({
  selector: 'app-cursor',
  standalone: true,
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.scss',
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursor', { static: true }) cursorRef!: ElementRef<HTMLElement>;

  private readonly isBrowser: boolean;
  private enabled = false;

  // Estado del movimiento / rotación (portado de Curzr ArrowPointer).
  private pointerX = 0;
  private pointerY = 0;
  private previousPointerX = 0;
  private previousPointerY = 0;
  private distance = 0;
  private angle = 0;
  private previousAngle = 0;
  private angleDisplace = 0;
  private readonly degrees = 57.296;
  private readonly cursorSize = 20;

  private readonly onMouseMove = (event: MouseEvent) => this.move(event.clientX, event.clientY);
  private readonly onTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch) {
      this.move(touch.clientX, touch.clientY);
    }
  };

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Solo activamos en dispositivos con puntero preciso (ratón/trackpad) y
    // cuando no se solicita movimiento reducido.
    if (!finePointer || reducedMotion) {
      return;
    }

    this.enabled = true;
    this.init();

    document.addEventListener('mousemove', this.onMouseMove, { passive: true });
    document.addEventListener('touchmove', this.onTouchMove, { passive: true });
    document.documentElement.classList.add('has-custom-cursor');
  }

  ngOnDestroy(): void {
    if (!this.isBrowser || !this.enabled) {
      return;
    }

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchmove', this.onTouchMove);
    document.documentElement.classList.remove('has-custom-cursor');
  }

  private init(): void {
    const el = this.cursorRef.nativeElement;
    Object.assign(el.style, {
      boxSizing: 'border-box',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '2147483647',
      width: `${this.cursorSize}px`,
      height: `${this.cursorSize}px`,
      transition: '250ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none',
    } satisfies Partial<CSSStyleDeclaration>);

    window.setTimeout(() => {
      el.removeAttribute('hidden');
    }, 500);
    el.style.opacity = '1';
  }

  private move(clientX: number, clientY: number): void {
    const el = this.cursorRef.nativeElement;

    this.previousPointerX = this.pointerX;
    this.previousPointerY = this.pointerY;
    this.pointerX = clientX;
    this.pointerY = clientY;

    const distanceX = this.previousPointerX - this.pointerX;
    const distanceY = this.previousPointerY - this.pointerY;
    this.distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    el.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;

    if (this.distance > 1) {
      this.rotate(distanceX, distanceY);
    } else {
      el.style.transform += ` rotate(${this.angleDisplace}deg)`;
    }
  }

  private rotate(distanceX: number, distanceY: number): void {
    const el = this.cursorRef.nativeElement;
    const unsortedAngle = Math.atan(Math.abs(distanceY) / Math.abs(distanceX)) * this.degrees;
    this.previousAngle = this.angle;

    if (distanceX <= 0 && distanceY >= 0) {
      this.angle = 90 - unsortedAngle + 0;
    } else if (distanceX < 0 && distanceY < 0) {
      this.angle = unsortedAngle + 90;
    } else if (distanceX >= 0 && distanceY <= 0) {
      this.angle = 90 - unsortedAngle + 180;
    } else if (distanceX > 0 && distanceY > 0) {
      this.angle = unsortedAngle + 270;
    }

    if (Number.isNaN(this.angle)) {
      this.angle = this.previousAngle;
    } else if (this.angle - this.previousAngle <= -270) {
      this.angleDisplace += 360 + this.angle - this.previousAngle;
    } else if (this.angle - this.previousAngle >= 270) {
      this.angleDisplace += this.angle - this.previousAngle - 360;
    } else {
      this.angleDisplace += this.angle - this.previousAngle;
    }

    el.style.left = `${-this.cursorSize / 2}px`;
    el.style.top = '0px';
    el.style.transform += ` rotate(${this.angleDisplace}deg)`;
  }
}
