import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Anima un número contando desde 0 hasta su valor objetivo cuando el elemento
 * entra en el viewport (inspirado en el count-up de jQuery / easing "swing").
 *
 * Acepta valores formateados como string y conserva su prefijo y sufijo:
 *   "+740k" → cuenta 0 → 740 mostrando siempre el "+" y la "k".
 *   "12"    → cuenta 0 → 12.
 *
 * Re-anima automáticamente cuando cambia el valor (p. ej. al cambiar de año)
 * y respeta prefers-reduced-motion / SSR mostrando el valor final.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnChanges, OnDestroy {
  @Input('appCountUp') value: string | number = '';
  @Input() countUpDuration = 2000;

  private readonly isBrowser: boolean;

  private prefix = '';
  private suffix = '';
  private target = 0;
  private decimals = 0;

  private visible = false;
  private reducedMotion = false;
  private rafId = 0;
  private observer?: IntersectionObserver;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.parse(String(this.value));

    if (!this.isBrowser) {
      this.render(this.target);
      return;
    }

    this.reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reducedMotion) {
      this.render(this.target);
      return;
    }

    // Sin IntersectionObserver no podemos detectar visibilidad: mostramos el
    // valor final directamente.
    if (typeof IntersectionObserver !== 'function') {
      this.render(this.target);
      return;
    }

    this.render(0);

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.visible = true;
            this.animate();
            this.observer?.unobserve(this.el.nativeElement);
          }
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['value'];
    if (!change || change.firstChange) {
      return;
    }

    this.parse(String(this.value));

    if (!this.isBrowser || this.reducedMotion) {
      this.render(this.target);
      return;
    }

    if (this.visible) {
      this.animate();
    } else {
      this.render(0);
    }
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.observer?.disconnect();
  }

  /** Separa el valor en prefijo, número objetivo, decimales y sufijo. */
  private parse(raw: string): void {
    const match = raw.match(/-?[\d.,]+/);

    if (!match) {
      this.prefix = raw;
      this.suffix = '';
      this.target = 0;
      this.decimals = 0;
      return;
    }

    const token = match[0];
    const index = match.index ?? 0;
    this.prefix = raw.slice(0, index);
    this.suffix = raw.slice(index + token.length);

    const normalized = token.replace(/,/g, '');
    this.target = parseFloat(normalized) || 0;

    const dot = normalized.indexOf('.');
    this.decimals = dot >= 0 ? normalized.length - dot - 1 : 0;
  }

  private animate(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    const start = performance.now();
    const to = this.target;
    const duration = this.countUpDuration;
    // Easing "swing" de jQuery.
    const swing = (p: number) => 0.5 - Math.cos(p * Math.PI) / 2;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      this.render(to * swing(progress));

      if (progress < 1) {
        this.rafId = requestAnimationFrame(tick);
      } else {
        this.rafId = 0;
        this.render(to);
      }
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private render(n: number): void {
    const num = this.decimals > 0 ? n.toFixed(this.decimals) : String(Math.round(n));
    this.el.nativeElement.textContent = `${this.prefix}${num}${this.suffix}`;
  }
}
