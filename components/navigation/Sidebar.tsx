// components/navigation/Sidebar.tsx
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
  const menuItems = userType === 'farmaceutico' ? farmaceuticoMenuItems : administradorMenuItems

  return (
    <aside className="w-64 bg-pague-blue text-white min-h-screen">
      <div className="p-4">
        <div className="text-xl font-bold mb-8">
          <span className="bg-pague-red p-2 rounded mr-2">+</span>
          Pague Menos
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.href.split('/').pop()
            return (
              <button
                key={item.label}
                onClick={() => onTabChange?.(item.href.split('/').pop() || '')}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-colors",
                  isActive 
                    ? "bg-white bg-opacity-20 shadow-lg" 
                    : "hover:bg-white hover:bg-opacity-10"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
        <div className="text-blue-200 text-xs text-center">
          <p>© 2024 PagueMenos</p>
          <p>Sistema de Protocolos</p>
        </div>
      </div>
    </aside>
  )
}
