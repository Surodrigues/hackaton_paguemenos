import './globals.css'
import React from 'react'

export const metadata = {
  title: 'PagueMenos - Sistema de Protocolos Farmacêuticos',
  description: 'Plataforma para farmacêuticos identificarem pacientes e prescreverem medicamentos de acordo com protocolos'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
