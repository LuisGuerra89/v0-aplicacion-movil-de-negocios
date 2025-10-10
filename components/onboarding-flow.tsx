"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Shield, Heart, TrendingUp, Sparkles } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: () => void
}

const screens = [
  {
    icon: Heart,
    title: "Bienvenido a tu comunidad",
    description:
      "Acá no venís solo a usar una app. Venís a formar parte de una comunidad que se cuida, se apoya y crece junta.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "¿Cómo funciona?",
    description: "Cada mes, aportás un granito de arena junto a tu grupo. Lo que se junta, se decide entre todos.",
    color: "text-accent",
  },
  {
    icon: Shield,
    title: "¿Con quién lo hago?",
    description:
      "MiGente es para grupos que se conocen, que se respetan. Acá no hay promesas vacías: hay compromiso real.",
    color: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Seguridad ante todo",
    description:
      "Usamos tecnología segura, incluyendo la tokenización, encriptación de datos y alertas de fraude para proteger tus transacciones.",
    color: "text-accent",
  },
  {
    icon: Sparkles,
    title: "¡Listos para empezar!",
    description:
      "Ya sos parte de algo más grande. Una red de personas que se organizan para estar mejor. ¡Vamos juntos!",
    color: "text-primary",
  },
]

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const current = screens[currentIndex]
  const Icon = current.icon

  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setDragOffset(0)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    setDragOffset(diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return

    const threshold = 50

    if (dragOffset < -threshold && currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (dragOffset > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }

    setIsDragging(false)
    setDragOffset(0)
    setStartX(0)
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-secondary/30 to-background"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div className="w-full max-w-md space-y-8">
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          <div className="flex justify-center mb-8">
            <div className={`p-6 rounded-full bg-card shadow-lg ${current.color} transition-all duration-300`}>
              <Icon className="w-16 h-16" strokeWidth={1.5} />
            </div>
          </div>

          <Card className="p-8 shadow-xl border-2">
            <div className="space-y-6 text-center">
              <h1 className="text-3xl font-bold text-balance leading-tight">{current.title}</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{current.description}</p>
            </div>
          </Card>
        </div>

        <div className="flex justify-center gap-2 py-4">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-border/80"
              }`}
              aria-label={`Ir a pantalla ${index + 1}`}
            />
          ))}
        </div>

        <div className="space-y-3">
          <Button onClick={handleNext} size="lg" className="w-full text-lg h-14 font-semibold">
            {currentIndex < screens.length - 1 ? "Siguiente" : "Comenzar"}
          </Button>
          {currentIndex < screens.length - 1 && (
            <Button onClick={handleSkip} variant="ghost" size="lg" className="w-full text-lg">
              Saltar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
