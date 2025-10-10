"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Users, Search, CheckCircle2 } from "lucide-react"
import { storage, type Group } from "@/lib/storage"

interface GroupJoinProps {
  onComplete: () => void
}

export function GroupJoin({ onComplete }: GroupJoinProps) {
  const [step, setStep] = useState(1)
  const [groupCode, setGroupCode] = useState("")
  const [foundGroup, setFoundGroup] = useState<Group | null>(null)

  const handleSearch = () => {
    // In a real app, this would make an API call
    const mockGroup: Group = {
      id: Date.now(),
      name: "Grupo Encontrado",
      members: 10,
      totalAmount: 6000,
      monthlyAmount: 600,
      nextPayment: "15 Dic 2025",
      yourTurn: false,
    }
    setFoundGroup(mockGroup)
    setStep(2)
  }

  const handleJoin = () => {
    if (foundGroup) {
      const state = storage.getState()
      storage.setState({
        groups: [...state.groups, foundGroup],
      })
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      if (step === 2) {
        setFoundGroup(null)
      }
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={step === 3 ? onComplete : handleBack}
            className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver</span>
          </button>
          <h1 className="text-2xl font-bold">Unirme a un grupo</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">
            {step === 3 ? "¡Listo!" : "Ingresá el código de invitación"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-8">
        {step === 1 && (
          <Card className="p-8 shadow-xl border-2">
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Search className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Código de invitación</h2>
                <p className="text-muted-foreground text-pretty">
                  Pedile al administrador del grupo que te comparta el código
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupCode" className="text-base font-semibold">
                  Código del grupo
                </Label>
                <Input
                  id="groupCode"
                  type="text"
                  placeholder="Ej: FAM-2024-1234"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                  className="h-12 text-base text-center font-mono tracking-wider"
                  maxLength={15}
                />
                <p className="text-sm text-muted-foreground text-center">
                  El código tiene letras y números separados por guiones
                </p>
              </div>

              <Card className="p-4 bg-accent/10 border-accent/20">
                <p className="text-sm text-balance leading-relaxed">
                  <strong>Recordá:</strong> Solo podés unirte a grupos cerrados con invitación. No podés unirte a otros
                  grupos mientras estés ahorrando en el grupo que pertenecés.
                </p>
              </Card>
            </div>
          </Card>
        )}

        {step === 2 && foundGroup && (
          <Card className="p-8 shadow-xl border-2">
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Users className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Grupo encontrado</h2>
                <p className="text-muted-foreground text-pretty">Revisá la información antes de unirte</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="text-xl font-bold text-center mb-4">{foundGroup.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Participantes</span>
                      <span className="font-semibold">{foundGroup.members} personas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Aporte mensual</span>
                      <span className="font-semibold text-primary text-lg">${foundGroup.monthlyAmount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Próximo pago</span>
                      <span className="font-semibold">{foundGroup.nextPayment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Fondo acumulado</span>
                      <span className="font-semibold">${foundGroup.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Card className="p-4 bg-accent/10 border-accent/20">
                  <p className="text-sm text-balance leading-relaxed">
                    Al unirte, aceptás aportar <strong>${foundGroup.monthlyAmount}</strong> cada mes. El débito se hará
                    automáticamente el día {foundGroup.nextPayment.split(" ")[0]} de cada mes.
                  </p>
                </Card>
              </div>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8 shadow-xl border-2">
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <CheckCircle2 className="w-16 h-16 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">¡Bienvenido al grupo!</h2>
                <p className="text-muted-foreground text-pretty text-lg">
                  Ya sos parte de <strong>{foundGroup?.name}</strong>
                </p>
              </div>

              <Card className="p-6 bg-accent text-accent-foreground border-2 border-accent">
                <p className="text-center text-balance leading-relaxed font-semibold">
                  "Acá no venís solo a usar una app. Venís a formar parte de una comunidad que se cuida, se apoya y
                  crece junta."
                </p>
              </Card>

              <div className="space-y-2 text-sm text-center text-muted-foreground">
                <p>Te enviaremos recordatorios antes de cada pago</p>
                <p>Podés ver el progreso del grupo en tu panel principal</p>
              </div>
            </div>
          </Card>
        )}

        <div className="mt-6 space-y-3">
          {step === 1 && (
            <Button
              onClick={handleSearch}
              size="lg"
              className="w-full text-lg h-14 font-semibold"
              disabled={groupCode.length < 5}
            >
              Buscar grupo
            </Button>
          )}
          {step === 2 && (
            <>
              <Button onClick={handleJoin} size="lg" className="w-full text-lg h-14 font-semibold">
                Unirme al grupo
              </Button>
              <Button
                onClick={handleBack}
                variant="outline"
                size="lg"
                className="w-full text-lg h-14 font-semibold border-2 bg-transparent"
              >
                Buscar otro grupo
              </Button>
            </>
          )}
          {step === 3 && (
            <Button onClick={onComplete} size="lg" className="w-full text-lg h-14 font-semibold">
              Ir al panel principal
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
