"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Bell, DollarSign, Users, CheckCircle, Calendar } from "lucide-react"
import { storage, type Notification } from "@/lib/storage"

interface NotificationsPanelProps {
  onClose: () => void
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const state = storage.getState()
    if (state.notifications?.length > 0) {
      setNotifications(state.notifications)
    } else {
      const defaultNotifications: Notification[] = [
        {
          id: 1,
          type: "reminder",
          title: "Próximo pago cercano",
          message: "Tu aporte de $600 para 'Grupo Familia' vence el 15 de noviembre",
          timestamp: "Hace 2 horas",
          read: false,
          groupId: 1,
        },
        {
          id: 2,
          type: "success",
          title: "¡Pago exitoso!",
          message: "Tu aporte mensual de $600 fue procesado correctamente",
          timestamp: "Hace 1 día",
          read: false,
          groupId: 2,
        },
        {
          id: 3,
          type: "group",
          title: "¡Es tu turno!",
          message: "Este mes recibirás el fondo de 'Compañeros Trabajo' ($7,200)",
          timestamp: "Hace 2 días",
          read: true,
          groupId: 2,
        },
        {
          id: 4,
          type: "payment",
          title: "Recordatorio de compromiso",
          message: "Recuerda que el próximo débito es el 20 de noviembre. Tu participación hace la diferencia.",
          timestamp: "Hace 3 días",
          read: true,
        },
      ]
      setNotifications(defaultNotifications)
      storage.setState({ notifications: defaultNotifications })
    }
  }, [])

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    setNotifications(updatedNotifications)
    storage.setState({ notifications: updatedNotifications })
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({ ...notif, read: true }))
    setNotifications(updatedNotifications)
    storage.setState({ notifications: updatedNotifications })
  }

  const deleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter((notif) => notif.id !== id)
    setNotifications(updatedNotifications)
    storage.setState({ notifications: updatedNotifications })
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "payment":
        return <DollarSign className="w-5 h-5" />
      case "reminder":
        return <Calendar className="w-5 h-5" />
      case "group":
        return <Users className="w-5 h-5" />
      case "success":
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "payment":
        return "text-primary"
      case "reminder":
        return "text-accent"
      case "group":
        return "text-secondary"
      case "success":
        return "text-green-600"
      default:
        return "text-muted-foreground"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-background w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Notificaciones</h2>
            {unreadCount > 0 && <p className="text-sm text-muted-foreground mt-1">{unreadCount} sin leer</p>}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="px-6 py-3 border-b">
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-primary">
              Marcar todas como leídas
            </Button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">No tienes notificaciones</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  !notification.read ? "bg-primary/5 border-primary/20" : "bg-card"
                }`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className={`flex-shrink-0 ${getIconColor(notification.type)}`}>{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm leading-tight">{notification.title}</h3>
                      {!notification.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        className="h-auto py-1 px-2 text-xs"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
