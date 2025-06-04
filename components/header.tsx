"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Search, User, ShoppingBag, Menu, X } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  const { toggleCart, getTotalItems } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#1a1a1a] px-4 md:px-10 py-3 bg-[#0a0a0a]">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <Link href="/">
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Anime Threads</h2>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link
            href="/shop"
            className="text-white text-sm font-medium leading-normal hover:text-[#e8b4b7] transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/collections"
            className="text-white text-sm font-medium leading-normal hover:text-[#e8b4b7] transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="text-white text-sm font-medium leading-normal hover:text-[#e8b4b7] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-white text-sm font-medium leading-normal hover:text-[#e8b4b7] transition-colors"
          >
            Contact
          </Link>
        </div>
        <div className="flex gap-2">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#1a1a1a] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#2a2a2a] transition-colors"
            >
              <Search size={20} />
            </button>
            {isSearchOpen && (
              <div className="absolute top-12 right-0 w-80 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 z-50">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder:text-gray-400 focus:outline-none focus:border-[#e8b4b7]"
                    autoFocus
                  />
                </form>
              </div>
            )}
          </div>

          {/* User Account */}
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#1a1a1a] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#2a2a2a] transition-colors">
            <User size={20} />
          </button>

          {/* Shopping Cart */}
          <button
            onClick={toggleCart}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#1a1a1a] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#2a2a2a] transition-colors relative"
          >
            <ShoppingBag size={20} />
            {mounted && getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#e8b4b7] text-[#0a0a0a] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="flex items-center justify-center rounded-xl h-10 bg-[#1a1a1a] text-white px-2.5"
        >
          <Search size={20} />
        </button>
        <button
          onClick={toggleCart}
          className="flex items-center justify-center rounded-xl h-10 bg-[#1a1a1a] text-white px-2.5 relative"
        >
          <ShoppingBag size={20} />
          {mounted && getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#e8b4b7] text-[#0a0a0a] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center rounded-xl h-10 bg-[#1a1a1a] text-white px-2.5"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-4 md:hidden z-50">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder:text-gray-400 focus:outline-none focus:border-[#e8b4b7]"
            />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-[#1a1a1a] md:hidden z-50">
          <div className="flex flex-col p-4 gap-4">
            <Link
              href="/shop"
              className="text-white text-sm font-medium py-2 hover:text-[#e8b4b7] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className="text-white text-sm font-medium py-2 hover:text-[#e8b4b7] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="text-white text-sm font-medium py-2 hover:text-[#e8b4b7] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-white text-sm font-medium py-2 hover:text-[#e8b4b7] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <button className="flex items-center gap-2 text-white text-sm font-medium py-2 hover:text-[#e8b4b7] transition-colors">
              <User size={16} />
              Account
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
