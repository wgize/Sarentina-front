import { Coffee, Heart, MapPin, Clock, Phone } from "lucide-react";

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#1C1008] border-t border-[#C8A96E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#C8A96E] flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#1C1008]" />
              </div>
              <span className="text-[#C8A96E] font-bold text-xl tracking-wide font-serif">
                La Sarentina
              </span>
            </div>
            <p className="text-[#F5F0E8]/40 text-sm leading-relaxed max-w-xs mb-4">
              Cafetería & Pastelería artesanal en el corazón del Cusco. Donde el
              café andino y el amor por los sabores locales se encuentran cada
              mañana.
            </p>

            {/* Quick info */}
            <div className="space-y-2 mb-5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8A96E] mt-0.5 shrink-0" />
                <span className="text-[#F5F0E8]/35 text-xs">
                  Prolongacion de la Cultura 720, Cusco 08003
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C8A96E] shrink-0" />
                <span className="text-[#F5F0E8]/35 text-xs">
                  Lun – Dom: 7:00 am – 11:00 pm
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A96E] shrink-0" />
                <a
                  href="tel:+51973511402"
                  className="text-[#F5F0E8]/35 hover:text-[#C8A96E] text-xs transition-colors"
                >
                  +51 973 511 402
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/la_sarentina/?hl=es-la"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-[#C8A96E]/15 flex items-center justify-center text-[#F5F0E8]/50 hover:text-[#C8A96E] hover:border-[#C8A96E]/40 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/Lasarentina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-[#C8A96E]/15 flex items-center justify-center text-[#F5F0E8]/50 hover:text-[#C8A96E] hover:border-[#C8A96E]/40 transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#F5F0E8] font-semibold text-sm mb-5 tracking-wide">
              Navegación
            </h4>
            <ul className="space-y-3">
              {["Inicio", "Nosotros", "Menú", "Ambiente", "Contacto"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-[#F5F0E8]/40 hover:text-[#C8A96E] text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Sedes */}
          <div>
            <h4 className="text-[#F5F0E8] font-semibold text-sm mb-5 tracking-wide">
              Nuestras Sedes
            </h4>
            <ul className="space-y-3">
              {[
                "Av. Collasuyo (1ro de Mayo)",
                "Amauta (La Canasta)",
                "Canasta Mariscal Gamarra",
                "San Sebastián (Municipio)",
              ].map((sede) => (
                <li key={sede} className="flex items-start gap-1.5">
                  <MapPin className="w-3 h-3 text-[#C8A96E]/60 mt-1 shrink-0" />
                  <span className="text-[#F5F0E8]/40 text-xs leading-relaxed">
                    {sede}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#C8A96E]/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#F5F0E8]/25 text-xs">
            © 2026 La Sarentina. Todos los derechos reservados.
          </p>
          <p className="text-[#F5F0E8]/25 text-xs flex items-center gap-1">
            Hecho con{" "}
            <Heart className="w-3 h-3 fill-[#C8A96E] text-[#C8A96E]" /> en
            Cusco, Perú
          </p>
        </div>
      </div>
    </footer>
  );
}
