"use client"

import { useCartStore } from "@/lib/cart-store"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ShoppingCart() {
  const { items, isOpen, removeItem, updateQuantity, toggleCart, getTotalItems, getTotalPrice } = useCartStore()
  const [mounted, setMounted] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Cart Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleCart} />}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-[#0a0a0a] border-l border-[#1a1a1a] transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
            <h2 className="text-white text-lg font-bold">Shopping Cart ({getTotalItems()})</h2>
            <button onClick={toggleCart} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 bg-[#1a1a1a] rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm mb-1">{item.name}</h3>
                      <p className="text-gray-400 text-xs mb-2">Size: {item.size}</p>
                      <p className="text-white font-bold">${item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => removeItem(item.id, item.size)} className="text-gray-400 hover:text-white">
                        <X size={16} />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-6 h-6 bg-[#2a2a2a] rounded flex items-center justify-center text-white hover:bg-[#3a3a3a]"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-6 h-6 bg-[#2a2a2a] rounded flex items-center justify-center text-white hover:bg-[#3a3a3a]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#1a1a1a]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-bold">Total:</span>
                <span className="text-white font-bold text-lg">${getTotalPrice().toFixed(2)}</span>
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="w-full h-12 bg-[#e8b4b7] text-[#0a0a0a] font-bold rounded-xl hover:bg-[#d4a1a4] transition-colors"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
