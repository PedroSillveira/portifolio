// hooks/useScrollDirection.ts
import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | 'initial';

/**
 * Hook customizado para determinar a direção do scroll.
 * @param threshold O número de pixels para ignorar o movimento inicial (evita tremores).
 * @returns 'up', 'down' ou 'initial'
 */
const useScrollDirection = (threshold = 10): ScrollDirection => {
    const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('initial');
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Se o scroll estiver no topo, sempre mostra
            if (currentScrollY === 0) {
                setScrollDirection('initial');
                setLastScrollY(currentScrollY);
                return;
            }

            // Ignora pequenos movimentos (threshold) para evitar tremulação
            const scrollDifference = currentScrollY - lastScrollY;
            if (Math.abs(scrollDifference) < threshold) {
                return;
            }

            // Define a direção
            if (currentScrollY > lastScrollY) {
                setScrollDirection('down'); // Rolando para baixo -> Esconde
            } else {
                setScrollDirection('up'); // Rolando para cima -> Mostra
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, threshold]);

    return scrollDirection;
};

export default useScrollDirection;