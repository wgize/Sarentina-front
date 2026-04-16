import React, { useState } from "react";
import { X, Trash2, Edit, Phone } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { ProductModal } from "@/components/ProductModal";
import type { CartItem } from "@/types/cart";

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const total = state.items.reduce((sum: number, item: CartItem) => {
    const price = parseFloat(item.price.replace("S/ ", ""));
    return sum + price * item.quantity;
  }, 0);

  const handleReserve = () => {
    const message = generateWhatsAppMessage(state.items, total);
    const phoneNumber = "+51973511402";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "CLOSE_CART" });
  };

  const generateWhatsAppMessage = (
    items: CartItem[],
    total: number,
  ): string => {
    let message =
      "¡Hola! Me gustaría reservar los siguientes productos de La Serantina:\n\n";

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      if (item.size) message += `   Tamaño: ${item.size}\n`;
      if (item.customizations && item.customizations.length > 0) {
        message += `   Personalizaciones: ${item.customizations.join(", ")}\n`;
      }
      message += `   Precio: ${item.price}\n\n`;
    });

    message += `Total: S/ ${total.toFixed(2)}\n\n`;
    message +=
      "¿Podrían confirmar la disponibilidad y coordinar la entrega/recogida?\n\n";
    message += "Gracias!";

    return message;
  };

  if (!state.isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 flex justify-end"
        onClick={() => dispatch({ type: "CLOSE_CART" })}
      >
        <div
          className="bg-white w-full max-w-md h-full overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-bold text-[#1C1008]">
                Tu Carrito
              </h2>
              <div className="flex items-center gap-2">
                {state.items.length > 0 && (
                  <button
                    onClick={() => dispatch({ type: "CLEAR_CART" })}
                    className="text-xs text-[#6B3A2A]/50 hover:text-red-500 transition-colors px-2 py-1"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Items */}
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#6B3A2A]/60 mb-4">Tu carrito está vacío</p>
                <button
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                  className="bg-[#C8A96E] text-[#1C1008] px-6 py-2 rounded-lg font-medium hover:bg-[#B89B5C] transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {state.items.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-[#1C1008]">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#6B3A2A]/60">
                          Cantidad: {item.quantity}{" "}
                          {item.size && `• ${item.size}`}
                        </p>
                        {item.customizations &&
                          item.customizations.length > 0 && (
                            <p className="text-xs text-[#6B3A2A]/50">
                              {item.customizations.join(", ")}
                            </p>
                          )}
                        <p className="font-medium text-[#C8A96E] mt-1">
                          {item.price}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {/* Editar → abre modal con opciones del producto */}
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-1 text-[#C8A96E] hover:bg-[#C8A96E]/10 rounded"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {/* Eliminar → quita solo este item */}
                        <button
                          onClick={() =>
                            dispatch({ type: "REMOVE_ITEM", payload: item.id })
                          }
                          className="p-1 text-red-400 hover:bg-red-50 rounded"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-[#C8A96E]">
                      S/ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Reserve Button */}
                <button
                  onClick={handleReserve}
                  className="w-full bg-[#1C1008] text-[#C8A96E] py-3 px-6 rounded-xl font-medium hover:bg-[#2A1810] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Reservar por WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de edición — key fuerza remonte al cambiar de item */}
      {editingItem && (
        <ProductModal
          key={editingItem.id}
          item={editingItem}
          isOpen={true}
          onClose={() => setEditingItem(null)}
          cartItemId={editingItem.id}
          initialQuantity={editingItem.quantity}
          initialSize={editingItem.size}
          initialCustomizations={editingItem.customizations}
        />
      )}
    </>
  );
};
