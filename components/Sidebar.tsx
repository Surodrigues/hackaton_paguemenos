'use client'

import React from 'react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userType: 'farmaceutico' | 'administrador'
}

const farmaceuticoMenuItems = [
  { id: 'inicio', label: 'Início', icon: '🏠' },
  { id: 'pacientes', label: 'Pacientes', icon: '👥' },
  { id: 'acompanhamentos', label: 'Acompanhamentos', icon: '📊' },
  { id: 'atendimentos', label: 'Atendimentos', icon: '🩺' },
  { id: 'relatorios', label: 'Relatórios', icon: '📋' },
]

const administradorMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'usuarios', label: 'Usuários', icon: '👥' },
  { id: 'protocolos', label: 'Protocolos', icon: '📋' },
  { id: 'relatorios', label: 'Relatórios', icon: '📈' },
  { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
]

export default function Sidebar({ activeTab, onTabChange, userType }: SidebarProps) {
  const menuItems = userType === 'farmaceutico' ? farmaceuticoMenuItems : administradorMenuItems

  return (
    <div className="w-64 bg-pague-blue min-h-screen flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-pague-red rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-lg font-bold">+</span>
          </div>
          <div>
            <h1 className="text-white text-lg font-bold">PagueMenos</h1>
            <p className="text-blue-200 text-xs">
              {userType === 'farmaceutico' ? 'Farmácia' : 'Administração'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeTab === item.id
                    ? 'bg-white bg-opacity-20 text-white shadow-lg'
                    : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                  }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-700">
        <div className="text-blue-200 text-xs text-center">
          <p>© 2025 PagueMenos</p>
          <p>Sistema de Protocolos</p>
        </div>
      </div>
    </div>
  )
}