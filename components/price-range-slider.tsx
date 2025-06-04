"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface PriceRangeSliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}

export default function PriceRangeSlider({ min, max, value, onChange }: PriceRangeSliderProps) {
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100

  const handleMouseDown = (type: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(type)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const newValue = Math.round(min + (percentage / 100) * (max - min))

    if (isDragging === "min") {
      onChange([Math.min(newValue, value[1] - 1), value[1]])
    } else {
      onChange([value[0], Math.max(newValue, value[0] + 1)])
    }
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, value])

  const minPercentage = getPercentage(value[0])
  const maxPercentage = getPercentage(value[1])

  return (
    <div className="px-2">
      <div className="text-white text-sm mb-4">Price Range</div>
      <div className="relative mb-4" ref={sliderRef}>
        {/* Track */}
        <div className="h-2 bg-[#2a2a2a] rounded-full relative">
          {/* Active range */}
          <div
            className="h-2 bg-white rounded-full absolute"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
            }}
          />
          {/* Min handle */}
          <div
            className="absolute w-4 h-4 bg-white rounded-full cursor-pointer transform -translate-y-1 -translate-x-2 hover:scale-110 transition-transform"
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown("min")}
          />
          {/* Max handle */}
          <div
            className="absolute w-4 h-4 bg-white rounded-full cursor-pointer transform -translate-y-1 -translate-x-2 hover:scale-110 transition-transform"
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={handleMouseDown("max")}
          />
        </div>
      </div>
      <div className="flex justify-between text-white text-sm">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  )
}
