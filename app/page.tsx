"use client"

import { useState } from "react"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { AuthScreen } from "@/components/auth-screen"
import { Dashboard } from "@/components/dashboard"
import { GroupCreation } from "@/components/group-creation"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"onboarding" | "auth" | "dashboard" | "create-group">("onboarding")
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const handleOnboardingComplete = () => {
    setCurrentScreen("auth")
  }

  const handleAuthComplete = (userData: { name: string; email: string }) => {
    setUser(userData)
    setCurrentScreen("dashboard")
  }

  const handleCreateGroup = () => {
    setCurrentScreen("create-group")
  }

  const handleGroupCreated = () => {
    setCurrentScreen("dashboard")
  }

  return (
    <main className="min-h-screen">
      {currentScreen === "onboarding" && <OnboardingFlow onComplete={handleOnboardingComplete} />}
      {currentScreen === "auth" && <AuthScreen onComplete={handleAuthComplete} />}
      {currentScreen === "dashboard" && user && <Dashboard user={user} onCreateGroup={handleCreateGroup} />}
      {currentScreen === "create-group" && <GroupCreation onComplete={handleGroupCreated} />}
    </main>
  )
}
