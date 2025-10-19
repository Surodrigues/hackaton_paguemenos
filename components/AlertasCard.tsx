'use client'

import React from 'react'

interface Alerta {
  id: string
  tipo: 'info' | 'warning' | 'error' | 'success'
  titulo: string
  descricao: string
  data: string
}

interface AlertasCardProps {
  alertas: Alerta[]
  pacienteNome?: string
}

export default function AlertasCard({ alertas, pacienteNome }: AlertasCardProps) {
  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'warning': return '⚠️'
      case 'error': return '🚨'
      case 'success': return '✅'
      default: return 'ℹ️'
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'warning': return 'border-yellow-400 bg-yellow-50'
      case 'error': return 'border-red-400 bg-red-50'
      case 'success': return 'border-green-400 bg-green-50'
      default: return 'border-blue-400 bg-blue-50'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Alertas</h2>
      
      {pacienteNome && (
        <div className="mb-4 p-3 bg-primary-blue/10 border border-primary-blue/20 rounded-lg">
          <p className="text-sm text-primary-blue font-medium">
            Alertas para: <span className="font-semibold">{pacienteNome}</span>
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        {alertas.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-2">📋</div>
            <p className="text-gray-500">
              {pacienteNome ? 'Nenhum alerta para este paciente' : 'Nenhum alerta disponível'}
            </p>
          </div>
        ) : (
          alertas.map((alerta) => (
            <div
              key={alerta.id}
              className={`border-l-4 p-4 rounded-r-lg ${getTipoColor(alerta.tipo)}`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-lg">{getTipoIcon(alerta.tipo)}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{alerta.titulo}</h3>
                  <p className="text-sm text-gray-600 mt-1">{alerta.descricao}</p>
                  <p className="text-xs text-gray-500 mt-2">{alerta.data}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

