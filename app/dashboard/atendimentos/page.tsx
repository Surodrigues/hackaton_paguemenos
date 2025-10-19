'use client'

import React from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'

interface Appointment {
  id: string
  patientName: string
  cpf: string
  date: string
  time: string
  status: 'Agendado' | 'Realizado' | 'Cancelado'
  protocol: string
}

const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Pedro Henrique',
    cpf: '123.456.789-12',
    date: '2024-01-15',
    time: '14:30',
    status: 'Agendado',
    protocol: 'Diabetes'
  },
  {
    id: '2',
    patientName: 'Maria Silva',
    cpf: '987.654.321-00',
    date: '2024-01-15',
    time: '15:00',
    status: 'Realizado',
    protocol: 'Hipertensão'
  },
  {
    id: '3',
    patientName: 'João Santos',
    cpf: '456.789.123-45',
    date: '2024-01-16',
    time: '10:00',
    status: 'Cancelado',
    protocol: 'Diabetes'
  },
]

export default function AttendancesPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendado':
        return 'bg-blue-100 text-blue-800'
      case 'Realizado':
        return 'bg-green-100 text-green-800'
      case 'Cancelado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Atendimentos</h1>
          <p className="text-gray-600">Gestão de atendimentos e consultas</p>
        </div>
        <Button variant="primary">
          + Novo Atendimento
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-pague-blue">15</div>
            <div className="text-sm text-gray-600">Atendimentos Hoje</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-600">Realizados</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">3</div>
            <div className="text-sm text-gray-600">Agendados</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">2</div>
            <div className="text-sm text-gray-600">Cancelados</div>
          </div>
        </Card>
      </div>

      {/* Lista de Atendimentos */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Paciente</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CPF</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data/Hora</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Protocolo</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-medium">{appointment.patientName}</td>
                  <td className="py-3 px-4 text-gray-600">{appointment.cpf}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(appointment.date).toLocaleDateString('pt-BR')} {appointment.time}
                  </td>
                  <td className="py-3 px-4">
                    <Chip variant="info" size="sm">
                      {appointment.protocol}
                    </Chip>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        Ver Detalhes
                      </Button>
                      {appointment.status === 'Agendado' && (
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      )}
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
