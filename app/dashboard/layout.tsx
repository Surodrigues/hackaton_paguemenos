'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/navigation/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeTab, setActiveTab] = useState('inicio')
  const [userType, setUserType] = useState<'farmaceutico' | 'administrador'>('farmaceutico')

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        userType={userType} 
      />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
