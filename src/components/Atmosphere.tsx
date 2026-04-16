import {
  Star,
  Quote,
  Wifi,
  Music,
  BookOpen,
  Palette,
  Leaf,
  Accessibility,
} from "lucide-react";
import PhotoReel, { type PhotoReelSlide } from "@/components/PhotoReel";

const testimonials = [
  {
    name: "María Elena Quispe",
    role: "Cusqueña, diseñadora",
    stars: 5,
    text: "La Serantina es mi lugar favorito para trabajar y desconectarme. El café de altura es incomparable y el ambiente es simplemente mágico.",
  },
  {
    name: "Carlos Mendoza",
    role: "Viajero, Buenos Aires",
    stars: 5,
    text: "Vine al Cusco de vacaciones y descubrí La Serantina. La torta de quinoa y el Cold Brew Andino son de lo mejor que he probado en mi vida.",
  },
  {
    name: "Ana Sofía Torres",
    role: "Cusqueña, abogada",
    stars: 5,
    text: "El equipo es increíblemente amable y el ambiente es súper acogedor. Es mi parada obligatoria cada mañana antes de ir al trabajo.",
  },
];

const atmosphereSlides: PhotoReelSlide[] = [
  {
    background: "linear-gradient(135deg, #6B3A2A 0%, #3D1F0D 100%)",
    label: "Interior acogedor",
    description:
      "Interiorismo cálido inspirado en la arquitectura inca y colonial.",
  },
  {
    background: "linear-gradient(135deg, #3D1F0D 0%, #C8A96E 100%)",
    label: "Barra de café",
    description:
      "Café de altura preparado con granos seleccionados del Cusco.",
  },
  {
    background: "linear-gradient(135deg, #C8A96E 0%, #6B3A2A 100%)",
    label: "Patio andino",
    description: "Jardín tranquilo para disfrutar al aire libre de los Andes.",
  },
];

const features = [
  {
    icon: Wifi,
    title: "WiFi Rápido",
    desc: "Conexión de alta velocidad para tu comodidad",
  },
  {
    icon: Music,
    title: "Música en Vivo",
    desc: "Viernes y sábados con músicos locales",
  },
  {
    icon: BookOpen,
    title: "Biblioteca",
    desc: "Rincón de lectura con libros para compartir",
  },
  {
    icon: Palette,
    title: "Arte Local",
    desc: "Exposiciones rotativas de artistas cusqueños",
  },
  {
    icon: Leaf,
    title: "Patio Interior",
    desc: "Jardín tranquilo para disfrutar al aire libre",
  },
  {
    icon: Accessibility,
    title: "Accesible",
    desc: "Espacio diseñado para todos",
  },
];

export default function Atmosphere() {
  return (
    <section id="ambiente" className="py-24 bg-[#1C1008]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[#C8A96E] text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Nuestro Espacio
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5F0E8] mb-4">
            Un ambiente <span className="italic text-[#C8A96E]">único</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C8A96E]" />
            <div className="w-2 h-2 rounded-full bg-[#C8A96E]" />
            <div className="h-px w-12 bg-[#C8A96E]" />
          </div>
          <p className="max-w-xl mx-auto text-[#F5F0E8]/50 text-base">
            Interiorismo inspirado en la arquitectura inca y colonial, creando
            un espacio cálido, íntimo y lleno de historia.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-20">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/5 border border-[#C8A96E]/10 rounded-2xl p-5 hover:bg-white/8 hover:border-[#C8A96E]/30 transition-all duration-300"
            >
              <f.icon className="w-8 h-8 mb-3 text-[#C8A96E]" />
              <h4 className="text-[#F5F0E8] font-semibold mb-1 text-sm">
                {f.title}
              </h4>
              <p className="text-[#F5F0E8]/40 text-xs leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Galería — reel de fotos */}
        <PhotoReel
          slides={atmosphereSlides}
          intervalMs={5000}
          className="mb-20 border border-[#C8A96E]/10"
        />

        {/* Testimonios */}
        <div className="mb-8">
          <h3 className="text-center text-2xl font-serif font-bold text-[#F5F0E8] mb-12">
            Lo que dicen nuestros clientes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-[#C8A96E]/10 rounded-2xl p-6 hover:border-[#C8A96E]/30 transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-[#C8A96E]/30 mb-4" />
                <p className="text-[#F5F0E8]/70 text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#F5F0E8] font-semibold text-sm">
                      {t.name}
                    </div>
                    <div className="text-[#F5F0E8]/40 text-xs mt-0.5">
                      {t.role}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#C8A96E] text-[#C8A96E]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
