import { useState } from "react";
import { Coffee, Cake, Sandwich, Leaf, Search, X } from "lucide-react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { ProductModal } from "./ProductModal";
import ProductCarousel from "@/components/ProductCarousel";
import type { MenuItem, Category } from "@/types/cart";
import { useSearch } from "@/contexts/SearchContext";

const categories: { id: Category; label: string; icon: ElementType }[] = [
  { id: "cafes", label: "Cafés", icon: Coffee },
  { id: "bebidas", label: "Bebidas", icon: Leaf },
  { id: "pasteles", label: "Pasteles", icon: Cake },
  { id: "salados", label: "Salados", icon: Sandwich },
];

const menuItems: Record<Category, MenuItem[]> = {
  cafes: [
    {
      name: "Espresso Andino",
      desc: "Doble shot de café cusqueño de altura, intenso y aromático.",
      price: "S/ 8",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=1",
    },
    {
      name: "Cappuccino Sarentina",
      desc: "Espresso con leche vaporizada y arte latte especial de la casa.",
      price: "S/ 12",
      image: "https://picsum.photos/400/300?random=2",
    },
    {
      name: "Cold Brew Andino",
      desc: "Café frío de 24 horas de preparación, suave y refrescante.",
      price: "S/ 14",
      tag: "Nuevo",
      image: "https://picsum.photos/400/300?random=3",
    },
    {
      name: "Cortado de Altura",
      desc: "Espresso con un toque de leche, equilibrado y reconfortante.",
      price: "S/ 10",
      image: "https://picsum.photos/400/300?random=4",
    },
    {
      name: "Latte de Canela",
      desc: "Espresso con leche y canela andina molida en el momento.",
      price: "S/ 13",
      image: "https://picsum.photos/400/300?random=5",
    },
    {
      name: "Café Inca",
      desc: "Mezcla secreta con cacao y maca andina, energizante natural.",
      price: "S/ 15",
      tag: "Especial",
      image: "https://picsum.photos/400/300?random=6",
    },
  ],
  bebidas: [
    {
      name: "Mate de Coca Premium",
      desc: "Hojas seleccionadas de coca del Valle Sagrado, suave y auténtico.",
      price: "S/ 7",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=7",
    },
    {
      name: "Smoothie Andino",
      desc: "Mezcla de frutas tropicales con maca y camu camu.",
      price: "S/ 16",
      image: "https://picsum.photos/400/300?random=8",
    },
    {
      name: "Limonada de Chincho",
      desc: "Refrescante limonada con hierba andina chincho y menta.",
      price: "S/ 10",
      image: "https://picsum.photos/400/300?random=9",
    },
    {
      name: "Chocolate Caliente",
      desc: "Cacao puro de Cusco con especias andinas y leche entera.",
      price: "S/ 14",
      tag: "Nuevo",
      image: "https://picsum.photos/400/300?random=10",
    },
    {
      name: "Infusión Serena",
      desc: "Blend exclusivo de hierbas aromáticas del Cusco.",
      price: "S/ 8",
      image: "https://picsum.photos/400/300?random=11",
    },
    {
      name: "Jugo de Maracuyá",
      desc: "Maracuyá fresca licuada con un toque de jengibre y limón.",
      price: "S/ 11",
      image: "https://picsum.photos/400/300?random=12",
    },
  ],
  pasteles: [
    {
      name: "Torta de Quinoa",
      desc: "Esponjosa torta de quinoa andina con frosting de crema chantilly.",
      price: "S/ 16",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=13",
    },
    {
      name: "Cheesecake de Maracuyá",
      desc: "Cremoso cheesecake con base de galleta y coulis de maracuyá.",
      price: "S/ 14",
      image: "https://picsum.photos/400/300?random=14",
    },
    {
      name: "Alfajores Cusqueños",
      desc: "Delicados alfajores bañados en manjar blanco artesanal.",
      price: "S/ 8",
      image: "https://picsum.photos/400/300?random=15",
    },
    {
      name: "Croissant de Maíz Morado",
      desc: "Croissant hojaldrado con relleno de crema de maíz morado.",
      price: "S/ 12",
      tag: "Nuevo",
      image: "https://picsum.photos/400/300?random=16",
    },
    {
      name: "Brownie de Cacao Andino",
      desc: "Intenso brownie de cacao puro con nueces y sal de Maras.",
      price: "S/ 10",
      image: "https://picsum.photos/400/300?random=17",
    },
    {
      name: "Muffin de Kiwicha",
      desc: "Muffin saludable de kiwicha con frutos rojos del Valle Sagrado.",
      price: "S/ 9",
      tag: "Especial",
      image: "https://picsum.photos/400/300?random=18",
    },
  ],
  salados: [
    {
      name: "Sándwich Andino",
      desc: "Pan artesanal con queso andino, jamón serrano y rúcula fresca.",
      price: "S/ 18",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=19",
    },
    {
      name: "Tostadas de Palta",
      desc: "Pan de masa madre con palta de la región y huevo pochado.",
      price: "S/ 16",
      image: "https://picsum.photos/400/300?random=20",
    },
    {
      name: "Quiche de Choclo",
      desc: "Quiche artesanal con choclo cusqueño, queso y hierbas finas.",
      price: "S/ 14",
      image: "https://picsum.photos/400/300?random=21",
    },
    {
      name: "Empanadas Sarentina",
      desc: "Empanadas horneadas rellenas de queso andino y ají amarillo.",
      price: "S/ 10",
      image: "https://picsum.photos/400/300?random=22",
    },
    {
      name: "Bowl de Quinoa",
      desc: "Quinoa cocida con vegetales asados, huevo y aderezo de la casa.",
      price: "S/ 20",
      tag: "Nuevo",
      image: "https://picsum.photos/400/300?random=23",
    },
    {
      name: "Croissant Salado",
      desc: "Croissant relleno de jamón, queso Edam y mostaza artesanal.",
      price: "S/ 13",
      image: "https://picsum.photos/400/300?random=24",
    },
  ],
};

/** Fotos de los productos más vendidos para el carrusel */
const featuredImages = [
  { src: "https://picsum.photos/1200/400?random=1",  alt: "Espresso Andino" },
  { src: "https://picsum.photos/1200/400?random=13", alt: "Torta de Quinoa" },
  { src: "https://picsum.photos/1200/400?random=7",  alt: "Mate de Coca Premium" },
  { src: "https://picsum.photos/1200/400?random=19", alt: "Sándwich Andino" },
  { src: "https://picsum.photos/1200/400?random=6",  alt: "Café Inca" },
  { src: "https://picsum.photos/1200/400?random=14", alt: "Cheesecake de Maracuyá" },
];

const tagColors: Record<string, string> = {
  Favorito: "bg-[#C8A96E]/20 text-[#8B6914]",
  Nuevo: "bg-green-100 text-green-700",
  Especial: "bg-[#6B3A2A]/10 text-[#6B3A2A]",
};

type MenuItemWithCategory = MenuItem & { category: Category };

// All items flattened for search
const allItems: MenuItemWithCategory[] = (
  Object.entries(menuItems) as [Category, MenuItem[]][]
).flatMap(([category, items]) => items.map((item) => ({ ...item, category })));

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("cafes");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { searchQuery, setSearchQuery } = useSearch();

  const isSearching = searchQuery.trim().length > 0;

  const displayItems: MenuItemWithCategory[] = isSearching
    ? allItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      )
    : menuItems[activeCategory].map((item) => ({ ...item, category: activeCategory }));

  // Icon for a given category
  const categoryIcon = (cat: Category) =>
    categories.find((c) => c.id === cat)?.icon ?? Coffee;

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[#C8A96E] text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Nuestra Carta
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1008] mb-4">
            Sabores que <span className="italic text-[#6B3A2A]">enamoran</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C8A96E]" />
            <div className="w-2 h-2 rounded-full bg-[#C8A96E]" />
            <div className="h-px w-12 bg-[#C8A96E]" />
          </div>
          <p className="max-w-xl mx-auto text-[#6B3A2A]/60 text-base">
            Elaborado con ingredientes frescos de los Andes peruanos, cada plato
            es una celebración de nuestra tierra.
          </p>
        </div>

        {/* Carrusel de productos destacados */}
        <ProductCarousel images={featuredImages} className="mb-14" />

        {/* Tabs o resultado de búsqueda */}
        {isSearching ? (
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-[#C8A96E]" />
              <span className="text-sm text-[#6B3A2A]/70">
                {displayItems.length > 0 ? (
                  <>
                    <span className="font-semibold text-[#1C1008]">
                      {displayItems.length}
                    </span>{" "}
                    resultado{displayItems.length !== 1 ? "s" : ""} para{" "}
                    <span className="font-semibold text-[#C8A96E]">
                      "{searchQuery}"
                    </span>
                  </>
                ) : (
                  <>
                    Sin resultados para{" "}
                    <span className="font-semibold text-[#C8A96E]">
                      "{searchQuery}"
                    </span>
                  </>
                )}
              </span>
            </div>
            <button
              onClick={() => setSearchQuery("")}
              className="flex items-center gap-1.5 text-xs text-[#6B3A2A]/50 hover:text-[#C8A96E] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Limpiar
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-[#1C1008] text-[#C8A96E] shadow-lg"
                    : "bg-[#F5F0E8] text-[#6B3A2A] hover:bg-[#C8A96E]/15",
                )}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Items grid */}
        {displayItems.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-[#C8A96E]/30 mx-auto mb-4" />
            <p className="text-[#6B3A2A]/50 text-sm">
              No encontramos productos con ese nombre.
            </p>
            <p className="text-[#6B3A2A]/35 text-xs mt-1">
              Intenta con otro término.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item) => {
              const cat = "category" in item ? item.category : activeCategory;
              const Icon = categoryIcon(cat);
              return (
                <div
                  key={item.name}
                  onClick={() => setSelectedItem(item)}
                  className="group bg-[#FBF8F3] rounded-2xl p-6 border border-[#C8A96E]/10 hover:border-[#C8A96E]/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C8A96E]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#C8A96E]" />
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-[#1C1008] text-base leading-tight">
                      {item.name}
                    </h4>
                    {item.tag && (
                      <span
                        className={cn(
                          "text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap",
                          tagColors[item.tag],
                        )}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {isSearching && "category" in item && (
                    <span className="inline-block text-[0.65rem] text-[#C8A96E]/60 uppercase tracking-wider mb-1 font-medium">
                      {categories.find((c) => c.id === item.category)?.label}
                    </span>
                  )}

                  <p className="text-sm text-[#6B3A2A]/60 leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#C8A96E]">
                      {item.price}
                    </span>
                    <span className="text-xs text-[#6B3A2A]/50 group-hover:text-[#C8A96E] transition-colors font-medium">
                      Ver opciones →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-[#6B3A2A]/50 text-sm mb-4">
            ¿Tienes restricciones alimentarias? Podemos adaptarnos.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1C1008] text-[#C8A96E] rounded-full font-semibold hover:bg-[#3D1F0D] transition-colors"
          >
            Ver menú completo
          </a>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        item={selectedItem!}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
