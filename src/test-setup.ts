/**
 * Setup global para los tests (Vitest + jsdom).
 *
 * jsdom no implementa varias APIs del navegador que usan los componentes
 * (matchMedia, IntersectionObserver). Aquí se stubean con valores neutros para
 * que los tests no revienten. Cada test puede sobre-escribir estos stubs cuando
 * necesite un comportamiento concreto (p. ej. forzar prefers-reduced-motion).
 */

// matchMedia: por defecto ninguna media query coincide.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

// IntersectionObserver: stub que no observa nada (no dispara callbacks).
if (typeof globalThis !== 'undefined' && !('IntersectionObserver' in globalThis)) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    constructor(_cb: IntersectionObserverCallback) {}
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}
