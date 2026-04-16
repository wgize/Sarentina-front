import { useState, useEffect, useCallback, useRef } from "react";

export interface CarouselImage {
  src: string;
  alt?: string;
}

interface ProductCarouselProps {
  images: CarouselImage[];
  intervalMs?: number;
  className?: string;
}

/**
 * Carrusel de fotos silencioso: sin texto, sin botones visibles.
 * La mitad izquierda y derecha son clicables para navegar.
 * Aplica un tinte cálido sutil sobre cada imagen.
 */
export default function ProductCarousel({
  images,
  intervalMs = 5000,
  className = "",
}: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = images.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, intervalMs);
  }, [count, intervalMs]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const go = useCallback(
    (index: number) => {
      setCurrent(index);
      startTimer();
    },
    [startTimer]
  );

  const prev = () => go((current - 1 + count) % count);
  const next = () => go((current + 1) % count);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-sm border border-[#C8A96E]/10 ${className}`}
      style={{ aspectRatio: "16 / 5" }}
    >
      {/* Track deslizante */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${count * 100}%`,
          transform: `translateX(-${current * (100 / count)}%)`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative h-full flex-shrink-0"
            style={{ width: `${100 / count}%` }}
          >
            <img
              src={img.src}
              alt={img.alt ?? ""}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Tinte cálido sutil para mantener la paleta de la página */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(61, 31, 13, 0.18)" }}
            />
          </div>
        ))}
      </div>

      {/* Área clicable izquierda — completamente invisible */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-0 top-0 w-1/2 h-full cursor-default"
      />

      {/* Área clicable derecha — completamente invisible */}
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-0 top-0 w-1/2 h-full cursor-default"
      />

      {/* Indicadores mínimos */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
        {images.map((_, i) => (
          <span
            key={i}
            className={`rounded-full transition-all duration-500 ${
              i === current
                ? "w-5 h-1 bg-[#C8A96E]/60"
                : "w-1 h-1 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
