import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PhotoReelSlide {
  /** URL de la imagen (relativa a /public o externa). Si se omite, usa `background`. */
  image?: string;
  /** Gradiente CSS de respaldo cuando no hay imagen. */
  background?: string;
  label: string;
  description?: string;
}

interface PhotoReelProps {
  slides: PhotoReelSlide[];
  /** Milisegundos entre cambios automáticos. Por defecto: 5000. */
  intervalMs?: number;
  className?: string;
}

export default function PhotoReel({
  slides,
  intervalMs = 5000,
  className = "",
}: PhotoReelProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = slides.length;

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
      className={`relative overflow-hidden rounded-2xl aspect-[16/7] ${className}`}
    >
      {/* Track — todos los slides en fila, se deslizan horizontalmente */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${count * 100}%`,
          transform: `translateX(-${current * (100 / count)}%)`,
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative h-full flex-shrink-0"
            style={{
              width: `${100 / count}%`,
              background: slide.background ?? "#1C1008",
              ...(slide.image
                ? {
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}),
            }}
          >
            {/* Overlay degradado para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Texto inferior */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <p className="text-[#C8A96E] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-2">
                {slide.label}
              </p>
              {slide.description && (
                <p className="text-[#F5F0E8]/80 text-sm sm:text-base max-w-md leading-relaxed">
                  {slide.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botón izquierdo */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Botón derecho */}
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicadores (dots) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Ir a diapositiva ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-[#C8A96E]"
                : "w-1.5 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
