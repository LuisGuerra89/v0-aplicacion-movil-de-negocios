"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Users, DollarSign, Calendar } from "lucide-react"
import { storage } from "@/lib/storage"

interface GroupCreationProps {
  onComplete: () => void
}

export function GroupCreation({ onComplete }: GroupCreationProps) {
  const [step, setStep] = useState(1)
  const [groupName, setGroupName] = useState("")
  const [groupSize, setGroupSize] = useState("12")
  const [monthlyAmount, setMonthlyAmount] = useState("")
  const [paymentDay, setPaymentDay] = useState("5")

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      const state = storage.getState()
      const newGroup = {
        id: Date.now(),
        name: groupName,
        members: Number.parseInt(groupSize),
        totalAmount: 0,
        monthlyAmount: Number.parseInt(monthlyAmount),
        nextPayment: `${paymentDay} Dic 2025`,
        yourTurn: false,
      }

      storage.setState({
        groups: [...state.groups, newGroup],
      })

      onComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={step === 1 ? onComplete : handleBack}
            className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver</span>
          </button>
          <h1 className="text-2xl font-bold">Crear nuevo grupo</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">Paso {step} de 3</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <Card className="p-8 shadow-xl border-2">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Users className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Información del grupo</h2>
                <p className="text-muted-foreground text-pretty">Dale un nombre que todos reconozcan</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupName" className="text-base font-semibold">
                  Nombre del grupo
                </Label>
                <Input
                  id="groupName"
                  type="text"
                  placeholder="Ej: Familia González, Compañeros de trabajo"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupSize" className="text-base font-semibold">
                  ¿Cuántas personas van a participar?
                </Label>
                <select
                  id="groupSize"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className="w-full h-12 px-3 rounded-lg border border-input bg-background text-base"
                >
                  <option value="6">6 personas</option>
                  <option value="12">12 personas</option>
                  <option value="18">18 personas</option>
                  <option value="24">24 personas</option>
                </select>
                <p className="text-sm text-muted-foreground">Grupos cerrados para mayor confianza</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <DollarSign className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Monto mensual</h2>
                <p className="text-muted-foreground text-pretty">¿Cuánto va a aportar cada persona cada mes?</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyAmount" className="text-base font-semibold">
                  Aporte mensual por persona
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
                  <Input
                    id="monthlyAmount"
                    type="number"
                    placeholder="500"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(e.target.value)}
                    className="pl-8 h-12 text-base"
                  />
                </div>
              </div>

              {monthlyAmount && (
                <Card className="p-4 bg-secondary border-0">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Fondo total mensual</p>
                    <p className="text-3xl font-bold text-primary">
                      ${(Number.parseInt(monthlyAmount) * Number.parseInt(groupSize)).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {groupSize} personas × ${monthlyAmount}
                    </p>
                  </div>
                </Card>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Calendar className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Fecha de pago</h2>
                <p className="text-muted-foreground text-pretty">¿Qué día del mes se hará el débito automático?</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentDay" className="text-base font-semibold">
                  Día del mes
                </Label>
                <select
                  id="paymentDay"
                  value={paymentDay}
                  onChange={(e) => setPaymentDay(e.target.value)}
                  className="w-full h-12 px-3 rounded-lg border border-input bg-background text-base"
                >
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      Día {day} de cada mes
                    </option>
                  ))}
                </select>
              </div>

              <Card className="p-4 bg-accent/10 border-accent/20">
                <p className="text-sm text-balance leading-relaxed">
                  <strong>Recordá:</strong> Dos días antes te avisaremos que se acerca el débito. Un día antes recibirás
                  otro recordatorio.
                </p>
              </Card>

              <div className="pt-4 space-y-3 border-t">
                <h3 className="font-bold">Resumen del grupo</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nombre:</span>
                    <span className="font-semibold">{groupName || "Sin nombre"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Participantes:</span>
                    <span className="font-semibold">{groupSize} personas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Aporte mensual:</span>
                    <span className="font-semibold">${monthlyAmount || "0"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Día de pago:</span>
                    <span className="font-semibold">Día {paymentDay}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-6 space-y-3">
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full text-lg h-14 font-semibold"
            disabled={(step === 1 && !groupName) || (step === 2 && !monthlyAmount)}
          >
            {step === 3 ? "Crear grupo" : "Continuar"}
          </Button>
          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              size="lg"
              className="w-full text-lg h-14 font-semibold border-2 bg-transparent"
            >
              Volver
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
