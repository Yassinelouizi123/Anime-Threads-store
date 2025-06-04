"use client"

import type React from "react"

import { useState } from "react"
import { Twitter, Instagram, Facebook } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-400 leading-relaxed">
            We're here to help! Reach out to us with any questions, feedback, or concerns. Our team is dedicated to
            providing you with the best possible experience.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-12">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Your Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e8b4b7] focus:border-transparent"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Your Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e8b4b7] focus:border-transparent"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Subject</label>
            <input
              name="subject"
              type="text"
              required
              placeholder="Enter the subject"
              className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e8b4b7] focus:border-transparent"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Your Message</label>
            <textarea
              name="message"
              required
              placeholder="Enter your message"
              rows={6}
              className="w-full p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e8b4b7] focus:border-transparent resize-none"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#e8b4b7] text-[#0a0a0a] font-bold rounded-xl hover:bg-[#d4a1a4] transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Social Links */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-6">Connect With Us</h2>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-[#e8b4b7] transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#e8b4b7] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#e8b4b7] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
