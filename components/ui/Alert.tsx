// components/ui/Alert.tsx
import { ReactNode } from 'react'
import { Warning, Info, CheckCircle, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface AlertProps {
  children: ReactNode
  variant: 'warning' | 'info' | 'success' | 'error'
  onClose?: () => void
  className?: string
}

export default function Alert({ children, variant, onClose, className }: AlertProps) {
  const variants = {
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: Warning,
      iconColor: 'text-yellow-400'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200', 
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-400'
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800', 
      icon: CheckCircle,
      iconColor: 'text-green-400'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: X,
      iconColor: 'text-red-400'
    }
  }

  const config = variants[variant]
  const Icon = config.icon

  return (
    <div className={cn("rounded-md border p-4", config.bg, className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={cn("h-5 w-5", config.iconColor)} />
        </div>
        <div className={cn("ml-3", config.text)}>
          {children}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
