import React from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'

interface Patient {
  cpf: string
  name: string
  birthDate: string
  age: number
  gender: string
  conditions: string[]
  medications: string[]
  recentAttendances: string[]
  alerts: string[]
  recommendedProtocols: string[]
}

interface PatientProfilePageProps {
  patient: Patient
  onBack: () => void
  onStartAttendance: () => void
}

export default function PatientProfilePage({ patient, onBack, onStartAttendance }: PatientProfilePageProps) {
  // Verificação para evitar erros durante prerendering
  if (!patient) {
    return <div>Carregando...</div>
  }
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
          <p className="text-gray-600">Perfil do Paciente</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Voltar
        </Button>
      </div>

      {/* Patient Info */}
      <Card title="Informações Pessoais">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
            <p className="text-gray-900 font-medium">{patient.birthDate}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
            <p className="text-gray-900 font-medium">{patient.age} anos</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
            <p className="text-gray-900 font-medium">{patient.gender}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
            <p className="text-gray-900 font-medium">{patient.cpf}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Condições de Saúde</label>
          <div className="flex flex-wrap gap-2">
            {patient.conditions.map((condition, index) => (
              <Chip key={index} variant="warning">
                {condition}
              </Chip>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimos Atendimentos */}
        <Card title="Últimos Atendimentos">
          <div className="space-y-3">
            {patient.recentAttendances.map((attendance, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-sm text-gray-700 font-medium">{attendance}</p>
                <p className="text-xs text-gray-500">14 de julho de 2024</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Alertas */}
        <Card title="Alertas Importantes">
          <div className="space-y-3">
            {patient.alerts.map((alert, index) => (
              <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                <p className="text-sm text-yellow-800">{alert}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Medicamentos */}
      <Card title="Medicamentos em Uso">
        <div className="flex flex-wrap gap-2">
          {patient.medications.map((medication, index) => (
            <Chip key={index} variant="info">
              {medication}
            </Chip>
          ))}
        </div>
      </Card>

      {/* Protocolos Recomendados */}
      <Card title="Protocolos Recomendados">
        <div className="space-y-3">
          {patient.recommendedProtocols.map((protocol, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <span className="text-blue-800 font-medium">{protocol}</span>
                <p className="text-blue-600 text-sm">Protocolo baseado nas condições do paciente</p>
              </div>
              <Button variant="secondary" size="sm">
                Iniciar Protocolo
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Botão Principal */}
      <div className="flex justify-center pt-6">
        <Button 
          variant="primary" 
          size="lg"
          onClick={onStartAttendance}
          className="px-8 py-4 text-lg"
        >
          🩺 Iniciar Atendimento
        </Button>
      </div>
    </div>
  )
}

