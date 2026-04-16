import { ChevronDown, MapPin, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1C1008 0%, #3D1F0D 40%, #6B3A2A 100%)",
      }}
    >
      {/* Textura de fondo decorativa */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #C8A96E 1px, transparent 1px),
                              radial-gradient(circle at 80% 20%, #C8A96E 1px, transparent 1px),
                              radial-gradient(circle at 60% 80%, #C8A96E 1px, transparent 1px)`,
            backgroundSize: "60px 60px, 40px 40px, 80px 80px",
          }}
        />
      </div>

      {/* Círculo decorativo grande */}
      <div className="absolute right-[-10%] top-[-10%] w-[600px] h-[600px] rounded-full bg-[#C8A96E]/5 border border-[#C8A96E]/10" />
      <div className="absolute right-[-5%] top-[-5%] w-[450px] h-[450px] rounded-full bg-[#C8A96E]/5 border border-[#C8A96E]/10" />

      {/* Círculo decorativo izquierda */}
      <div className="absolute left-[-15%] bottom-[-10%] w-[500px] h-[500px] rounded-full bg-[#6B3A2A]/30 border border-[#C8A96E]/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Título principal */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#F5F0E8] leading-tight mb-4 animate-fade-in-up delay-100"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
        >
          La
          <br />
          <span className="text-[#C8A96E] italic">Serantina</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#F5F0E8]/70 font-light tracking-widest uppercase mb-6 animate-fade-in-up delay-200">
          Cafetería & Pastelería
        </p>

        {/* Separador decorativo */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up delay-300">
          <div className="h-px w-16 bg-[#C8A96E]/50" />
          <div className="w-2 h-2 rounded-full bg-[#C8A96E]" />
          <div className="h-px w-16 bg-[#C8A96E]/50" />
        </div>

        {/* Descripción */}
        <p className="max-w-2xl mx-auto text-[#F5F0E8]/60 text-base sm:text-lg leading-relaxed mb-10 animate-fade-in-up delay-400">
          En el corazón del Cusco, donde el aroma del café se mezcla con el
          espíritu andino. Una experiencia única de sabor, cultura y tradición.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
          <a
            href="#menu"
            className="px-8 py-3.5 bg-[#C8A96E] text-[#1C1008] rounded-full font-semibold text-base hover:bg-[#D4B87A] hover:scale-105 transition-all duration-200 shadow-lg shadow-[#C8A96E]/30"
          >
            Ver Menú
          </a>
          <a
            href="#nosotros"
            className="px-8 py-3.5 border border-[#C8A96E]/50 text-[#C8A96E] rounded-full font-semibold text-base hover:bg-[#C8A96E]/10 hover:border-[#C8A96E] transition-all duration-200"
          >
            Nuestra Historia
          </a>
        </div>

        {/* Info rápida */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 animate-fade-in-up delay-500">
          <div className="flex items-center gap-2 text-[#F5F0E8]/50">
            <Clock className="w-4 h-4 text-[#C8A96E]" />
            <span className="text-sm">Lun – Dom: 7:00 am – 9:00 pm</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#C8A96E]/30" />
          <div className="flex items-center gap-2 text-[#F5F0E8]/50">
            <MapPin className="w-4 h-4 text-[#C8A96E]" />
            <span className="text-sm">Centro Histórico, Cusco</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#nosotros"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C8A96E]/60 hover:text-[#C8A96E] transition-colors animate-float"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
}
