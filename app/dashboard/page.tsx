'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'

interface Patient {
  id: string
  cpf: string
  name: string
  conditions: string[]
  alerts: string[]
}

const mockPatients: Patient[] = [
  {
    id: '1',
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
    id: '2',
    cpf: '987.654.321-00',
    name: 'Maria Silva',
    conditions: ['Hipertensão'],
    alerts: [
      'Medicação em falta há 3 dias',
      'Próxima consulta agendada para próxima semana'
    ]
  }
]

export default function DashboardPage() {
  const router = useRouter()
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
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pague-blue"></div>
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
                    onClick={() => router.push(`/dashboard/paciente/${foundPatient.id}`)}
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

      {/* Métricas Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-pague-blue mb-2">12</div>
            <p className="text-gray-600">Atendimentos do Dia</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">38</div>
            <p className="text-gray-600">Pacientes Ativos</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">8</div>
            <p className="text-gray-600">Consultas na Semana</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">3</div>
            <p className="text-gray-600">Protocolos Pendentes</p>
          </div>
        </Card>
      </div>

      {/* Pacientes Recentes */}
      <Card title="Pacientes Recentes">
        <div className="space-y-3">
          {mockPatients.slice(0, 3).map((patient, index) => (
            <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-pague-blue rounded-full flex items-center justify-center text-white font-bold">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-gray-600 text-sm">{patient.cpf}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex flex-wrap gap-1">
                  {patient.conditions.slice(0, 2).map((condition, idx) => (
                    <Chip key={idx} variant="warning" size="sm">
                      {condition}
                    </Chip>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/dashboard/paciente/${patient.id}`)}
                >
                  Ver →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
