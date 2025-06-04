"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import { Check, ChevronRight, CreditCard, MapPin, Truck } from "lucide-react"

type CheckoutStep = "information" | "shipping" | "payment" | "confirmation"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information")
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zipCode: "",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  })
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && items.length === 0 && !orderComplete) {
      router.push("/shop")
    }
  }, [mounted, items, router, orderComplete])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === "information") {
      setCurrentStep("shipping")
    } else if (currentStep === "shipping") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      // Process payment and complete order
      const randomOrderNumber = `AT-${Math.floor(100000 + Math.random() * 900000)}`
      setOrderNumber(randomOrderNumber)
      setOrderComplete(true)
      setCurrentStep("confirmation")
      clearCart()
    }
  }

  const getStepClass = (step: CheckoutStep) => {
    const steps: Record<CheckoutStep, number> = {
      information: 1,
      shipping: 2,
      payment: 3,
      confirmation: 4,
    }

    const currentStepNumber = steps[currentStep]
    const thisStepNumber = steps[step]

    if (thisStepNumber < currentStepNumber) {
      return "bg-[#e8b4b7] text-[#0a0a0a]"
    } else if (thisStepNumber === currentStepNumber) {
      return "bg-white text-[#0a0a0a]"
    } else {
      return "bg-[#2a2a2a] text-white"
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Checkout Form */}
          <div className="flex-1">
            <Link href="/shop" className="text-[#e8b4b7] hover:underline mb-6 inline-block">
              &larr; Continue Shopping
            </Link>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepClass("information")}`}>
                  {currentStep === "information" ? "1" : <Check size={16} />}
                </div>
                <span className="ml-2 text-sm hidden sm:inline">Information</span>
                <ChevronRight className="mx-2 text-gray-500" size={16} />
              </div>

              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepClass("shipping")}`}>
                  {currentStep === "shipping" || currentStep === "information" ? "2" : <Check size={16} />}
                </div>
                <span className="ml-2 text-sm hidden sm:inline">Shipping</span>
                <ChevronRight className="mx-2 text-gray-500" size={16} />
              </div>

              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepClass("payment")}`}>
                  {currentStep === "payment" || currentStep === "shipping" || currentStep === "information" ? (
                    "3"
                  ) : (
                    <Check size={16} />
                  )}
                </div>
                <span className="ml-2 text-sm hidden sm:inline">Payment</span>
                <ChevronRight className="mx-2 text-gray-500" size={16} />
              </div>

              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepClass("confirmation")}`}
                >
                  4
                </div>
                <span className="ml-2 text-sm hidden sm:inline">Confirmation</span>
              </div>
            </div>

            {/* Checkout Forms */}
            {currentStep === "information" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="apartment" className="block text-sm font-medium mb-1">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Japan">Japan</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State/Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="h-12 px-8 bg-[#e8b4b7] text-[#0a0a0a] font-bold rounded-xl hover:bg-[#d4a1a4] transition-colors"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </form>
            )}

            {currentStep === "shipping" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                  <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-[#e8b4b7]" />
                      <p className="font-medium">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {formData.address} {formData.apartment && `, ${formData.apartment}`}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <p className="text-gray-400 text-sm">{formData.country}</p>
                    <button
                      type="button"
                      onClick={() => setCurrentStep("information")}
                      className="text-[#e8b4b7] text-sm mt-2 hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl cursor-pointer border border-transparent hover:border-[#e8b4b7] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === "standard"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#e8b4b7] focus:ring-[#e8b4b7]"
                        />
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-gray-400 text-sm">5-7 business days</p>
                        </div>
                      </div>
                      <p className="font-medium">$5.99</p>
                    </label>

                    <label className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl cursor-pointer border border-transparent hover:border-[#e8b4b7] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === "express"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#e8b4b7] focus:ring-[#e8b4b7]"
                        />
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-gray-400 text-sm">2-3 business days</p>
                        </div>
                      </div>
                      <p className="font-medium">$12.99</p>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("information")}
                    className="text-[#e8b4b7] hover:underline"
                  >
                    Return to Information
                  </button>
                  <button
                    type="submit"
                    className="h-12 px-8 bg-[#e8b4b7] text-[#0a0a0a] font-bold rounded-xl hover:bg-[#d4a1a4] transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {currentStep === "payment" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                  <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-[#e8b4b7]" />
                      <p className="font-medium">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {formData.address} {formData.apartment && `, ${formData.apartment}`}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <p className="text-gray-400 text-sm">{formData.country}</p>
                    <button
                      type="button"
                      onClick={() => setCurrentStep("information")}
                      className="text-[#e8b4b7] text-sm mt-2 hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck size={16} className="text-[#e8b4b7]" />
                      <p className="font-medium">
                        {formData.shippingMethod === "standard"
                          ? "Standard Shipping (5-7 business days)"
                          : "Express Shipping (2-3 business days)"}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {formData.shippingMethod === "standard" ? "$5.99" : "$12.99"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setCurrentStep("shipping")}
                      className="text-[#e8b4b7] text-sm mt-2 hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  <div className="space-y-3 mb-6">
                    <label className="flex items-center p-4 bg-[#1a1a1a] rounded-xl cursor-pointer border border-transparent hover:border-[#e8b4b7] transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === "credit-card"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#e8b4b7] focus:ring-[#e8b4b7]"
                      />
                      <div className="ml-3 flex-1">
                        <p className="font-medium">Credit Card</p>
                        <div className="flex gap-2 mt-1">
                          <div className="w-10 h-6 bg-gray-700 rounded"></div>
                          <div className="w-10 h-6 bg-gray-700 rounded"></div>
                          <div className="w-10 h-6 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 bg-[#1a1a1a] rounded-xl cursor-pointer border border-transparent hover:border-[#e8b4b7] transition-colors opacity-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        disabled
                        className="w-4 h-4 text-[#e8b4b7] focus:ring-[#e8b4b7]"
                      />
                      <div className="ml-3">
                        <p className="font-medium">PayPal</p>
                        <p className="text-gray-400 text-sm">Coming soon</p>
                      </div>
                    </label>
                  </div>

                  {formData.paymentMethod === "credit-card" && (
                    <div className="space-y-4 bg-[#1a1a1a] p-4 rounded-xl">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full h-12 px-4 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium mb-1">
                            Expiration Date (MM/YY)
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full h-12 px-4 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cardCvc" className="block text-sm font-medium mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full h-12 px-4 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#e8b4b7]"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("shipping")}
                    className="text-[#e8b4b7] hover:underline"
                  >
                    Return to Shipping
                  </button>
                  <button
                    type="submit"
                    className="h-12 px-8 bg-[#e8b4b7] text-[#0a0a0a] font-bold rounded-xl hover:bg-[#d4a1a4] transition-colors"
                  >
                    Complete Order
                  </button>
                </div>
              </form>
            )}

            {currentStep === "confirmation" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#e8b4b7] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={32} className="text-[#0a0a0a]" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
                <p className="text-gray-400 mb-6">Your order has been placed successfully.</p>

                <div className="bg-[#1a1a1a] p-6 rounded-xl mb-8 text-left">
                  <p className="font-medium mb-2">
                    Order Number: <span className="text-[#e8b4b7]">{orderNumber}</span>
                  </p>
                  <p className="text-gray-400 text-sm mb-4">A confirmation email has been sent to {formData.email}</p>

                  <div className="border-t border-[#2a2a2a] pt-4 mt-4">
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p className="text-gray-400 text-sm">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formData.address} {formData.apartment && `, ${formData.apartment}`}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <p className="text-gray-400 text-sm">{formData.country}</p>
                  </div>

                  <div className="border-t border-[#2a2a2a] pt-4 mt-4">
                    <h3 className="font-medium mb-2">Shipping Method</h3>
                    <p className="text-gray-400 text-sm">
                      {formData.shippingMethod === "standard"
                        ? "Standard Shipping (5-7 business days)"
                        : "Express Shipping (2-3 business days)"}
                    </p>
                  </div>

                  <div className="border-t border-[#2a2a2a] pt-4 mt-4">
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-[#e8b4b7]" />
                      <p className="text-gray-400 text-sm">Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/"
                  className="h-12 px-8 bg-[#e8b4b7] text-[#0a0a0a] font-bold rounded-xl hover:bg-[#d4a1a4] transition-colors inline-flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {currentStep !== "confirmation" && (
            <div className="w-full md:w-96">
              <div className="bg-[#1a1a1a] rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="max-h-80 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 py-3 border-b border-[#2a2a2a] last:border-0"
                    >
                      <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-400 text-sm">Size: {item.size}</p>
                        <div className="flex justify-between mt-1">
                          <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                          <p className="font-medium">${item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 py-4 border-t border-[#2a2a2a]">
                  <div className="flex justify-between">
                    <p className="text-gray-400">Subtotal</p>
                    <p className="font-medium">${getTotalPrice().toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Shipping</p>
                    <p className="font-medium">
                      {formData.shippingMethod === "standard"
                        ? "$5.99"
                        : formData.shippingMethod === "express"
                          ? "$12.99"
                          : "Calculated at next step"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Tax</p>
                    <p className="font-medium">${(getTotalPrice() * 0.08).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex justify-between py-4 border-t border-[#2a2a2a]">
                  <p className="font-bold">Total</p>
                  <p className="font-bold text-xl">
                    $
                    {(
                      getTotalPrice() +
                      (formData.shippingMethod === "standard"
                        ? 5.99
                        : formData.shippingMethod === "express"
                          ? 12.99
                          : 0) +
                      getTotalPrice() * 0.08
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
