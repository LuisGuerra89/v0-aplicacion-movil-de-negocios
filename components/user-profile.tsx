"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Mail, Calendar, LogOut, ArrowLeft } from "lucide-react"

interface UserProfileProps {
  user: { name: string; email: string }
  onBack: () => void
  onLogout: () => void
}

export function UserProfile({ user, onBack, onLogout }: UserProfileProps) {
  const joinDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 pb-24">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">Mi Perfil</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 -mt-16 pb-8 space-y-6">
        {/* Profile Card */}
        <Card className="p-8 shadow-xl border-2 bg-card">
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>

            {/* User Info */}
            <div className="text-center space-y-2 w-full">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <p className="text-sm">{user.email}</p>
              </div>
            </div>

            {/* Member Since */}
            <div className="w-full pt-4 border-t">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <p className="text-sm">Miembro desde {joinDate}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Info */}
        <Card className="p-6 shadow-lg border-2">
          <h3 className="text-lg font-bold mb-4">Información de cuenta</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Nombre completo</span>
              <span className="font-semibold">{user.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Correo electrónico</span>
              <span className="font-semibold text-sm">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-muted-foreground">Estado</span>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">Activo</span>
            </div>
          </div>
        </Card>

        {/* Community Message */}
        <Card className="p-6 bg-accent text-accent-foreground border-2 border-accent">
          <p className="text-center text-balance leading-relaxed">
            Eres parte de una comunidad que se apoya y crece junta. ¡Gracias por tu compromiso!
          </p>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          size="lg"
          className="w-full h-14 text-base font-semibold border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  )
}
