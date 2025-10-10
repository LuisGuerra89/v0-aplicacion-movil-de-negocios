"use client"

import { useState, useEffect } from "react"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { AuthScreen } from "@/components/auth-screen"
import { Dashboard } from "@/components/dashboard"
import { GroupCreation } from "@/components/group-creation"
import { GroupJoin } from "@/components/group-join"
import { UserProfile } from "@/components/user-profile"
import { storage } from "@/lib/storage"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<
    "onboarding" | "auth" | "dashboard" | "create-group" | "join-group" | "profile"
  >("onboarding")
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const state = storage.getState()

    if (state.hasCompletedOnboarding && state.user) {
      setUser(state.user)
      setCurrentScreen("dashboard")
    } else if (state.hasCompletedOnboarding) {
      setCurrentScreen("auth")
    }

    setIsLoading(false)
  }, [])

  const handleOnboardingComplete = () => {
    storage.setState({ hasCompletedOnboarding: true })
    setCurrentScreen("auth")
  }

  const handleAuthComplete = (userData: { name: string; email: string }) => {
    setUser(userData)
    storage.setState({ user: userData })
    setCurrentScreen("dashboard")
  }

  const handleCreateGroup = () => {
    setCurrentScreen("create-group")
  }

  const handleJoinGroup = () => {
    setCurrentScreen("join-group")
  }

  const handleGroupCreated = () => {
    setCurrentScreen("dashboard")
  }

  const handleGroupJoined = () => {
    setCurrentScreen("dashboard")
  }

  const handleViewProfile = () => {
    setCurrentScreen("profile")
  }

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard")
  }

  const handleLogout = () => {
    storage.clearState()
    setUser(null)
    setCurrentScreen("onboarding")
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="w-full max-w-md min-h-screen bg-background shadow-2xl flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center">
      <div className="w-full max-w-md min-h-screen bg-background shadow-2xl">
        {currentScreen === "onboarding" && <OnboardingFlow onComplete={handleOnboardingComplete} />}
        {currentScreen === "auth" && <AuthScreen onComplete={handleAuthComplete} />}
        {currentScreen === "dashboard" && user && (
          <Dashboard
            user={user}
            onCreateGroup={handleCreateGroup}
            onJoinGroup={handleJoinGroup}
            onViewProfile={handleViewProfile}
          />
        )}
        {currentScreen === "create-group" && <GroupCreation onComplete={handleGroupCreated} />}
        {currentScreen === "join-group" && <GroupJoin onComplete={handleGroupJoined} />}
        {currentScreen === "profile" && user && (
          <UserProfile user={user} onBack={handleBackToDashboard} onLogout={handleLogout} />
        )}
      </div>
    </main>
  )
}
