'use client'

import React from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'

interface Protocol {
  id: string
  name: string
  type: 'diabetes' | 'hipertensao' | 'geral'
  description: string
  urgency: 'Alta' | 'Média' | 'Baixa'
  estimatedTime: string
  tags: string[]
}

const protocols: Protocol[] = [
  {
    id: '1',
    name: 'Protocolo Diabetes Tipo 2',
    type: 'diabetes',
    description: 'Avaliação completa e gestão farmacêutica da diabetes mellitus tipo 2 com foco no controle glicêmico e prevenção de complicações.',
    urgency: 'Alta',
    estimatedTime: '15-20 min',
    tags: ['Controle Glicêmico', 'Pressão Arterial', 'Hábitos Alimentares', 'Monitoramento Contínuo']
  },
  {
    id: '2',
    name: 'Protocolo Hipertensão Arterial',
    type: 'hipertensao',
    description: 'Protocolo para avaliação, diagnóstico e manejo farmacêutico da hipertensão arterial sistêmica.',
    urgency: 'Média',
    estimatedTime: '10-15 min',
    tags: ['Monitoramento PA', 'Controle Sódico', 'Atividade Física', 'Medicamentos Anti-hipertensivos']
  },
  {
    id: '3',
    name: 'Protocolo Saúde Geral',
    type: 'geral',
    description: 'Avaliação preventiva e orientação farmacêutica para pacientes sem condições específicas identificadas.',
    urgency: 'Baixa',
    estimatedTime: '5-10 min',
    tags: ['Check-up Preventivo', 'Orientação Geral', 'Hábitos Saudáveis']
  }
]

export default function ProtocolsPage() {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Alta':
        return 'bg-red-100 text-red-800'
      case 'Média':
        return 'bg-orange-100 text-orange-800'
      case 'Baixa':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCardBorderColor = (type: string) => {
    switch (type) {
      case 'diabetes':
        return 'border-red-200 bg-red-50/50'
      case 'hipertensao':
        return 'border-orange-200 bg-orange-50/50'
      case 'geral':
        return 'border-blue-200 bg-blue-50/50'
      default:
        return 'border-gray-200 bg-gray-50/50'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Protocolos</h1>
          <p className="text-gray-600">Biblioteca de protocolos médicos disponíveis</p>
        </div>
        <Button variant="primary">
          + Criar Novo Protocolo
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-pague-blue">{protocols.length}</div>
            <div className="text-sm text-gray-600">Protocolos Ativos</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {protocols.filter(p => p.urgency === 'Alta').length}
            </div>
            <div className="text-sm text-gray-600">Alta Prioridade</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {protocols.filter(p => p.urgency === 'Média').length}
            </div>
            <div className="text-sm text-gray-600">Média Prioridade</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {protocols.filter(p => p.type === 'geral').length}
            </div>
            <div className="text-sm text-gray-600">Casos Gerais</div>
          </div>
        </Card>
      </div>

      {/* Lista de Protocolos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {protocols.map((protocol) => (
          <Card key={protocol.id} className={`relative ${getCardBorderColor(protocol.type)}`}>
            <div className="space-y-4">
              {/* Header com badge de urgência */}
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-gray-900">{protocol.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(protocol.urgency)}`}>
                  {protocol.urgency}
                </span>
              </div>

              {/* Descrição */}
              <p className="text-gray-700 leading-relaxed">
                {protocol.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {protocol.tags.map((tag, index) => (
                  <Chip key={index} variant="info" size="sm">
                    {tag}
                  </Chip>
                ))}
              </div>

              {/* Tempo estimado e ações */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">⏱️ Tempo estimado:</span> {protocol.estimatedTime}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      📖 Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      ✏️ Editar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Seção em desenvolvimento */}
      <Card className="mt-8">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🛠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Protocolos Específicos em Desenvolvimento
          </h3>
          <p className="text-gray-600 mb-4">
            Protocolos específicos para diabetes, hipertensão e outras condições estão sendo implementados.
          </p>
          <Button variant="secondary">
            🔄 Atualizar Biblioteca
          </Button>
        </div>
      </Card>
    </div>
  )
}
