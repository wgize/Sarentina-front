import React, { useState } from "react";
import { X, Plus, Minus, Check } from "lucide-react";
import type { MenuItem } from "@/types/cart";
import { useCart } from "@/hooks/useCart";

interface ProductModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  /** Si se provee, el modal opera en modo edición y usa UPDATE_ITEM al confirmar */
  cartItemId?: string;
  initialQuantity?: number;
  initialSize?: string;
  initialCustomizations?: string[];
}

const sizes = ["Pequeño", "Mediano", "Grande"];
const customizations = ["Sin azúcar", "Extra leche", "Descafeinado", "Vegano"];

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  isOpen,
  onClose,
  cartItemId,
  initialQuantity,
  initialSize,
  initialCustomizations,
}) => {
  const { dispatch } = useCart();
  const isEditMode = Boolean(cartItemId);
  const [quantity, setQuantity] = useState(initialQuantity ?? 1);
  const [selectedSize, setSelectedSize] = useState(initialSize ?? sizes[1]);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>(initialCustomizations ?? []);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (isEditMode && cartItemId) {
      dispatch({
        type: "UPDATE_ITEM",
        payload: {
          id: cartItemId,
          updates: { quantity, size: selectedSize, customizations: selectedCustomizations },
        },
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          ...item,
          quantity,
          size: selectedSize,
          customizations: selectedCustomizations,
        },
      });
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const toggleCustomization = (customization: string) => {
    setSelectedCustomizations((prev) =>
      prev.includes(customization)
        ? prev.filter((c) => c !== customization)
        : [...prev, customization],
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-serif font-bold text-[#1C1008]">
              {item.name}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />

          {/* Description */}
          <p className="text-[#6B3A2A]/70 mb-4">{item.desc}</p>

          {/* Price */}
          <div className="text-2xl font-bold text-[#C8A96E] mb-6">
            {item.price}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1C1008] mb-2">
              Cantidad
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1C1008] mb-2">
              Tamaño
            </label>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-[#C8A96E] bg-[#C8A96E]/10 text-[#C8A96E]"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Customizations */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1C1008] mb-2">
              Personalizaciones
            </label>
            <div className="space-y-2">
              {customizations.map((customization) => (
                <label
                  key={customization}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCustomizations.includes(customization)}
                    onChange={() => toggleCustomization(customization)}
                    className="w-4 h-4 text-[#C8A96E] border-gray-300 rounded focus:ring-[#C8A96E]"
                  />
                  <span className="text-sm text-[#6B3A2A]">
                    {customization}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              added
                ? "bg-[#C8A96E]/15 text-[#C8A96E] border border-[#C8A96E]/40 scale-95 cursor-default"
                : "bg-[#1C1008] text-[#C8A96E] hover:bg-[#2A1810]"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                {isEditMode ? "¡Actualizado!" : "¡Agregado!"}
              </>
            ) : isEditMode ? (
              <>Actualizar pedido</>
            ) : (
              <>Agregar al Carrito — {item.price}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
