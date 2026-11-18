import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observed = new WeakSet();

    const revealElement = (el) => {
      if (el.classList.contains('is-revealed')) return;
      const delayMs = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
      if (delayMs > 0) {
        el.style.setProperty('--reveal-delay', `${delayMs}ms`);
      }
      el.classList.add('is-revealed');
      window.setTimeout(() => {
        el.classList.add('reveal-settled');
      }, delayMs + 800);
    };

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed', 'reveal-settled');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const scanAndObserve = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        if (!observed.has(el) && !el.classList.contains('is-revealed')) {
          observed.add(el);
          observer.observe(el);
        }
      });
    };

    scanAndObserve();

    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
