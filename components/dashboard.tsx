"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Plus, TrendingUp, Calendar, Bell, DollarSign, User } from "lucide-react"
import { storage, type Group } from "@/lib/storage"

interface DashboardProps {
  user: { name: string; email: string }
  onCreateGroup: () => void
  onJoinGroup: () => void
  onViewProfile: () => void
}

export function Dashboard({ user, onCreateGroup, onJoinGroup, onViewProfile }: DashboardProps) {
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    const state = storage.getState()
    if (state.groups.length > 0) {
      setGroups(state.groups)
    } else {
      // Default demo groups if none exist
      const defaultGroups: Group[] = [
        {
          id: 1,
          name: "Grupo Familia",
          members: 8,
          totalAmount: 4800,
          monthlyAmount: 600,
          nextPayment: "15 Nov 2025",
          yourTurn: false,
        },
        {
          id: 2,
          name: "Compañeros Trabajo",
          members: 12,
          totalAmount: 7200,
          monthlyAmount: 600,
          nextPayment: "20 Nov 2025",
          yourTurn: true,
        },
      ]
      setGroups(defaultGroups)
      storage.setState({ groups: defaultGroups })
    }
  }, [])

  const totalSaved = groups.reduce((sum, group) => sum + group.totalAmount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 pb-24">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">¡Hola, {user.name.split(" ")[0]}!</h1>
              <p className="text-primary-foreground/80 text-sm">Tu comunidad te espera</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <button
                onClick={onViewProfile}
                className="p-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
              >
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 -mt-16 pb-8 space-y-6">
        {/* Summary Card */}
        <Card className="p-6 shadow-xl border-2 bg-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-semibold">Total ahorrado</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-bold text-primary">${totalSaved.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">En {groups.length} grupos activos</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={onCreateGroup} size="lg" className="h-24 flex-col gap-2 text-base font-semibold">
            <Plus className="w-6 h-6" />
            Crear grupo
          </Button>
          <Button
            onClick={onJoinGroup}
            variant="outline"
            size="lg"
            className="h-24 flex-col gap-2 text-base font-semibold border-2 bg-transparent"
          >
            <Users className="w-6 h-6" />
            Unirme a grupo
          </Button>
        </div>

        {/* Groups List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Mis grupos</h2>
          {groups.map((group) => (
            <Card key={group.id} className="p-6 shadow-lg border-2 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">{group.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{group.members} personas</span>
                    </div>
                  </div>
                  {group.yourTurn && (
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                      ¡Tu turno!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <DollarSign className="w-3 h-3" />
                      <span>Fondo total</span>
                    </div>
                    <p className="text-xl font-bold text-primary">${group.totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Próximo pago</span>
                    </div>
                    <p className="text-sm font-semibold">{group.nextPayment}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Tu aporte mensual</span>
                    <span className="font-bold">${group.monthlyAmount}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: "75%" }} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Motivational Message */}
        <Card className="p-6 bg-accent text-accent-foreground border-2 border-accent">
          <p className="text-center text-balance leading-relaxed font-semibold">
            💪 "Gracias por cumplir con tu aporte. Tu compromiso sostiene al grupo."
          </p>
        </Card>
      </div>
    </div>
  )
}
