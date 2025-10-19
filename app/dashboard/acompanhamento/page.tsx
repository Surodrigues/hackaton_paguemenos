'use client'

import React from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'

interface FollowUp {
  id: string
  patientName: string
  cpf: string
  condition: string
  lastAppointment: string
  nextAppointment?: string
  status: 'Em Andamento' | 'Aguardando' | 'Atrasado'
  progress: number
}

const followUps: FollowUp[] = [
  {
    id: '1',
    patientName: 'Pedro Henrique',
    cpf: '123.456.789-12',
    condition: 'Diabetes',
    lastAppointment: '2024-01-10',
    nextAppointment: '2024-01-24',
    status: 'Em Andamento',
    progress: 75
  },
  {
    id: '2',
    patientName: 'Maria Silva',
    cpf: '987.654.321-00',
    condition: 'Hipertensão',
    lastAppointment: '2024-01-08',
    status: 'Aguardando',
    progress: 60
  },
  {
    id: '3',
    patientName: 'João Santos',
    cpf: '456.789.123-45',
    condition: 'Diabetes',
    lastAppointment: '2024-01-05',
    nextAppointment: '2024-01-19',
    status: 'Atrasado',
    progress: 40
  },
]

export default function FollowUpPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento':
        return 'bg-green-100 text-green-800'
      case 'Aguardando':
        return 'bg-yellow-100 text-yellow-800'
      case 'Atrasado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Acompanhamento</h1>
          <p className="text-gray-600">Monitoramento de pacientes em tratamento</p>
        </div>
        <Button variant="primary">
          + Novo Acompanhamento
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-pague-blue">25</div>
            <div className="text-sm text-gray-600">Em Acompanhamento</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">18</div>
            <div className="text-sm text-gray-600">Em Andamento</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">5</div>
            <div className="text-sm text-gray-600">Aguardando</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">2</div>
            <div className="text-sm text-gray-600">Atrasados</div>
          </div>
        </Card>
      </div>

      {/* Lista de Acompanhamentos */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Paciente</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CPF</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Condição</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Última Consulta</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Próxima Consulta</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Progresso</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {followUps.map((followUp) => (
                <tr key={followUp.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-medium">{followUp.patientName}</td>
                  <td className="py-3 px-4 text-gray-600">{followUp.cpf}</td>
                  <td className="py-3 px-4">
                    <Chip variant="warning" size="sm">
                      {followUp.condition}
                    </Chip>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(followUp.lastAppointment).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {followUp.nextAppointment
                      ? new Date(followUp.nextAppointment).toLocaleDateString('pt-BR')
                      : 'Não agendada'
                    }
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(followUp.status)}`}>
                      {followUp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pague-blue h-2 rounded-full"
                          style={{ width: `${followUp.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{followUp.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        Atualizar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
