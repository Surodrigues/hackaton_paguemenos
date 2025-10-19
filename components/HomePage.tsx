'use client'

import React, { useState } from 'react'
import Card from './ui/Card'
import Button from './ui/Button'
import Input from './ui/Input'
import Chip from './ui/Chip'

interface Patient {
  cpf: string
  name: string
  conditions: string[]
  alerts: string[]
}

const mockPatients: Patient[] = [
  {
    cpf: '123.456.789-12',
    name: 'Pedro Henrique',
    conditions: ['Diabetes', 'Hipertensão'],
    alerts: [
      'Tratamento de diabetes em andamento',
      'Teve queda capilar: há 1 semana',
      'Teve diarreia: há 2 semanas'
    ]
  },
  {
    cpf: '987.654.321-00',
    name: 'Maria Silva',
    conditions: ['Hipertensão'],
    alerts: [
      'Medicação em falta há 3 dias',
      'Próxima consulta agendada para próxima semana'
    ]
  }
]

interface HomePageProps {
  onViewProfile: (patient: Patient) => void
}

export default function HomePage({ onViewProfile }: HomePageProps) {
  const [cpf, setCpf] = useState('')
  const [foundPatient, setFoundPatient] = useState<Patient | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleCpfChange = (value: string) => {
    setCpf(value)
    
    // Simular busca do paciente com delay
    if (value.length === 14) {
      setIsSearching(true)
      setTimeout(() => {
        const patient = mockPatients.find(p => p.cpf === value)
        setFoundPatient(patient || null)
        setIsSearching(false)
      }, 1000)
    } else {
      setFoundPatient(null)
    }
  }

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Sistema de protocolos farmacêuticos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Iniciar Atendimentos */}
        <Card title="Iniciar Atendimentos" className="h-fit">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CPF:
              </label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => handleCpfChange(formatCpf(e.target.value))}
                placeholder="Digite o CPF do paciente"
                maxLength={14}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pague-blue focus:border-transparent transition-colors"
              />
            </div>
            
            {isSearching && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-blue"></div>
                <span className="ml-2 text-gray-600">Buscando paciente...</span>
              </div>
            )}
            
            {foundPatient && !isSearching && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{foundPatient.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {foundPatient.conditions.map((condition, index) => (
                        <Chip key={index} variant="warning" size="sm">
                          {condition}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => onViewProfile(foundPatient)}
                  >
                    Ver Perfil
                  </Button>
                </div>
              </div>
            )}
            
            {!foundPatient && !isSearching && cpf.length === 14 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-800 text-sm">Paciente não encontrado. Verifique o CPF digitado.</p>
              </div>
            )}
          </div>
        </Card>

        {/* Card Alertas */}
        <Card title="Alertas" className="h-fit">
          <div className="space-y-3">
            {foundPatient ? (
              foundPatient.alerts.map((alert, index) => (
                <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <p className="text-sm text-yellow-800">{alert}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🔍</div>
                <p>Digite um CPF para ver os alertas do paciente</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}