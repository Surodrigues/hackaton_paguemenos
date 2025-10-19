'use client'

import { useRouter } from 'next/navigation'
import {
  House, Users, Calendar, ChartLine,
  FileText, Clipboard, Gear
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface MenuItem {
  icon: any
  label: string
  href: string
  active?: boolean
}

interface SidebarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  userType?: 'farmaceutico' | 'administrador'
}

const farmaceuticoMenuItems: MenuItem[] = [
  { icon: House, label: 'Início', href: '/dashboard' },
  { icon: Users, label: 'Pacientes', href: '/dashboard/pacientes' },
  { icon: Calendar, label: 'Atendimentos', href: '/dashboard/atendimentos' },
  { icon: ChartLine, label: 'Acompanhamento', href: '/dashboard/acompanhamento' },
  { icon: FileText, label: 'Relatórios', href: '/dashboard/relatorios' },
  { icon: Clipboard, label: 'Protocolos', href: '/dashboard/protocolos' },
]

const administradorMenuItems: MenuItem[] = [
  { icon: House, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Usuários', href: '/dashboard/usuarios' },
  { icon: Clipboard, label: 'Protocolos', href: '/dashboard/protocolos' },
  { icon: FileText, label: 'Relatórios', href: '/dashboard/relatorios' },
  { icon: Gear, label: 'Configurações', href: '/dashboard/configuracoes' },
]

export default function Sidebar({ activeTab, onTabChange, userType = 'farmaceutico' }: SidebarProps) {
  const router = useRouter()
  const menuItems = userType === 'farmaceutico' ? farmaceuticoMenuItems : administradorMenuItems

  const handleNavigation = (href: string) => {
    router.push(href)
    onTabChange?.(href.split('/').pop() || '')
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 text-gray-900 min-h-screen flex flex-col">
      <div className="p-4 flex-1">
        <div className="text-xl font-bold mb-8 flex items-center">
          <img
            src="/paguemenos_logo.png"
            alt="Pague Menos"
            className="h-8 w-auto mr-2"
          />
          <span className="text-sm"></span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.href.split('/').pop()
            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-colors",
                  isActive
                    ? "bg-pague-blue text-white shadow-sm"
                    : "hover:bg-gray-50 text-gray-700 hover:text-pague-blue"
                )}
              >
                <item.icon size={20} className={isActive ? "text-white" : "text-gray-500"} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-gray-500 text-xs text-center">
          <p>© 2025 PagueMenos</p>
          <p>Sistema de Protocolos</p>
        </div>
      </div>
    </aside>
  )
}
