'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'

interface Report {
  id: string
  title: string
  type: 'Pacientes' | 'Atendimentos' | 'Protocolos' | 'Medicamentos'
  period: string
  generatedAt: string
  status: 'Disponível' | 'Processando' | 'Erro'
}

const reports: Report[] = [
  {
    id: '1',
    title: 'Relatório de Pacientes Ativos',
    type: 'Pacientes',
    period: 'Janeiro 2024',
    generatedAt: '2024-01-15 10:30',
    status: 'Disponível'
  },
  {
    id: '2',
    title: 'Atendimentos do Mês',
    type: 'Atendimentos',
    period: 'Janeiro 2024',
    generatedAt: '2024-01-15 09:45',
    status: 'Disponível'
  },
  {
    id: '3',
    title: 'Uso de Protocolos',
    type: 'Protocolos',
    period: 'Dezembro 2023',
    generatedAt: '2024-01-01 08:00',
    status: 'Processando'
  },
  {
    id: '4',
    title: 'Medicamentos Dispensados',
    type: 'Medicamentos',
    period: 'Janeiro 2024',
    generatedAt: '2024-01-14 14:20',
    status: 'Disponível'
  },
]

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<string>('Todos')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800'
      case 'Processando':
        return 'bg-yellow-100 text-yellow-800'
      case 'Erro':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Pacientes':
        return 'bg-blue-100 text-blue-800'
      case 'Atendimentos':
        return 'bg-purple-100 text-purple-800'
      case 'Protocolos':
        return 'bg-indigo-100 text-indigo-800'
      case 'Medicamentos':
        return 'bg-teal-100 text-teal-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredReports = selectedType === 'Todos'
    ? reports
    : reports.filter(report => report.type === selectedType)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Relatórios administrativos do sistema</p>
        </div>
        <Button variant="primary">
          + Gerar Novo Relatório
        </Button>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {['Todos', 'Pacientes', 'Atendimentos', 'Protocolos', 'Medicamentos'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === type
                  ? 'bg-pague-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-pague-blue">{reports.length}</div>
            <div className="text-sm text-gray-600">Relatórios Gerados</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {reports.filter(r => r.status === 'Disponível').length}
            </div>
            <div className="text-sm text-gray-600">Disponíveis</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {reports.filter(r => r.status === 'Processando').length}
            </div>
            <div className="text-sm text-gray-600">Processando</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {reports.filter(r => r.status === 'Erro').length}
            </div>
            <div className="text-sm text-gray-600">Com Erro</div>
          </div>
        </Card>
      </div>

      {/* Lista de Relatórios */}
      <Card>
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl">📊</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{report.period}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">
                      Gerado em {new Date(report.generatedAt).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
                {report.status === 'Disponível' && (
                  <Button variant="outline" size="sm">
                    📥 Baixar
                  </Button>
                )}
              </div>
            </div>
          ))}
          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-2">📋</div>
              <p>Nenhum relatório encontrado para o filtro selecionado.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
