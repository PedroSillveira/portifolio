// hooks/useScrollAnimation.ts
import { useEffect, useRef } from 'react';

// O threshold define o quanto do elemento deve estar visível para disparar a animação (0.1 = 10%)
const useScrollAnimation = (rootMargin = '0px', threshold = 0.1) => {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Função para observar e adicionar a classe 'is-visible'
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adiciona a classe que dispara o CSS Transition
          entry.target.classList.add('is-visible');
          // Para de observar o elemento após a animação (otimização)
          observer.unobserve(entry.target);
        }
      });
    };

    const options = {
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Seleciona todos os elementos que têm a classe 'animate-' e os observa
    const animationElements = document.querySelectorAll<HTMLElement>('[class*="animate-"]');
    animationElements.forEach(el => {
      observer.observe(el);
      elementsRef.current.push(el);
    });

    // Limpeza (cleanup) para o React
    return () => {
      elementsRef.current.forEach(el => observer.unobserve(el));
    };
  }, [rootMargin, threshold]);
};

export default useScrollAnimation;