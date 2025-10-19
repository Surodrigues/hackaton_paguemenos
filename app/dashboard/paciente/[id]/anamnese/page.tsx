'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'

interface AnamneseFormData {
  chronicHealth: string
  allergies: string
  lifestyle: string
  habits: {
    smoking: boolean
    alcohol: boolean
    tobacco: boolean
  }
}

function AnamneseFormPage({ params, onNext }: { params: Promise<{ id: string }>, onNext: () => void }) {
  const [formData, setFormData] = useState<AnamneseFormData>({
    chronicHealth: '',
    allergies: '',
    lifestyle: '',
    habits: {
      smoking: false,
      alcohol: false,
      tobacco: false
    }
  })

  const patient = {
    name: 'Pedro Henrique',
    conditions: ['Diabetes', 'Hipertensão'],
    medications: ['Metformina', 'Losartana']
  }

  const handleHabitToggle = (habit: keyof typeof formData.habits) => {
    setFormData(prev => ({
      ...prev,
      habits: {
        ...prev.habits,
        [habit]: !prev.habits[habit]
      }
    }))
  }

  const handleTextareaChange = (field: keyof Omit<AnamneseFormData, 'habits'>) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Anamnese</h1>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold text-gray-700">{patient.name}</span>
          <Button variant="outline" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </div>
      </div>

      {/* Condição de Saúde */}
      <Card title="Condição de Saúde">
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600 text-sm">
              Informações sobre as condições de saúde do paciente
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {patient.conditions.map((condition, index) => (
              <Chip key={index} variant="warning">
                {condition}
              </Chip>
            ))}
          </div>
        </div>
      </Card>

      {/* Remédios em Uso */}
      <Card title="Remédios em Uso">
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600 text-sm">
              Medicamentos atualmente em uso pelo paciente
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {patient.medications.map((medication, index) => (
              <Chip key={index} variant="success">
                {medication}
              </Chip>
            ))}
          </div>
        </div>
      </Card>

      {/* Perguntas da Anamnese */}
      <Card title="Questionário de Saúde">
        <div className="space-y-6">
          {/* Pergunta 1 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Possui algum problema de saúde crônico?
            </h3>
            <textarea
              value={formData.chronicHealth}
              onChange={handleTextareaChange('chronicHealth')}
              placeholder="Descreva os problemas de saúde crônicos..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pague-blue focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Pergunta 2 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Possui alguma alergia de medicamento, alimento ou substância?
            </h3>
            <textarea
              value={formData.allergies}
              onChange={handleTextareaChange('allergies')}
              placeholder="Descreva as alergias conhecidas..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pague-blue focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Pergunta 3 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Como está sua alimentação, prática de atividades físicas e hábitos de vida (álcool, tabaco)?
            </h3>
            <textarea
              value={formData.lifestyle}
              onChange={handleTextareaChange('lifestyle')}
              placeholder="Descreva seus hábitos de vida..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pague-blue focus:border-transparent"
              rows={4}
            />
          </div>
        </div>
      </Card>

      {/* Hábitos de Vida */}
      <Card title="Hábitos de Vida (últimos 6 meses)">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm mb-4">
            Selecione os hábitos que se aplicam ao paciente:
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleHabitToggle('smoking')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                formData.habits.smoking
                  ? 'bg-pague-red text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fuma
            </button>
            <button
              onClick={() => handleHabitToggle('alcohol')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                formData.habits.alcohol
                  ? 'bg-pague-red text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Álcool
            </button>
            <button
              onClick={() => handleHabitToggle('tobacco')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                formData.habits.tobacco
                  ? 'bg-pague-red text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tabaco
            </button>
          </div>
        </div>
      </Card>

      {/* Botão Próximo */}
      <div className="flex justify-end pt-6">
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          className="px-8 py-4 text-lg"
        >
          Próximo →
        </Button>
      </div>
    </div>
  )
}

function AnamneseResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [patientId, setPatientId] = React.useState<string>('')

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setPatientId(resolvedParams.id)
    })
  }, [params])

  const handleStartProtocol = (protocolType: 'diabetes' | 'hipertensao') => {
    router.push(`/dashboard/paciente/${patientId}/protocolo/${protocolType}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Resultados da Anamnese</h1>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold text-gray-700">Pedro Henrique</span>
          <Button variant="outline" onClick={() => window.history.back()}>
            ← Voltar
          </Button>
        </div>
      </div>

      {/* Análise Inteligente */}
      <Card title="Análise Inteligente">
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">👤 Paciente Diabetico</h3>
            <p className="text-blue-800">
              Paciente apresenta características típicas de condição diabética.
              Recomendamos avaliação dos níveis sanguíneos de glucose para confirmação diagnóstica.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Riscos Identificados</h3>
            <p className="text-yellow-800">
              Baseado nas informações coletadas, existe risco elevado de complicações
              cardiovasculares. Recomendamos monitoramento próximo da pressão arterial.
            </p>
          </div>

          <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">💊 Recomendações Gerais</h3>
            <ul className="text-green-800 list-disc list-inside space-y-1">
              <li>Ajustar hábitos alimentares para controle glicêmico</li>
              <li>Manter rotina de exercícios físicos leves</li>
              <li>Realizar acompanhamento médico mensal</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Protocolos Sugeridos */}
      <Card title="Protocolos Sugeridos">
        <div className="space-y-4">
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-red-900">Protocolo Diabetes</h3>
                <p className="text-red-700 text-sm mb-2">
                  Gestão e tratamento da diabetes mellitus baseada nos sintomas e histórico do paciente.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Controle Glicêmico
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Pressão Arterial
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Hábitos Alimentares
                  </span>
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleStartProtocol('diabetes')}
                className="px-6 py-3"
              >
                🚀 Iniciar Protocolo
              </Button>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <p className="text-red-800 text-sm">
                <strong>Urgência:</strong> Alta • <strong>Duração Estimada:</strong> 15-20 min
              </p>
            </div>
          </div>

          <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-orange-900">Protocolo Hipertensão</h3>
                <p className="text-orange-700 text-sm mb-2">
                  Avaliação e manejo da hipertensão arterial com foco na redução de riscos cardiovasculares.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    Monitoramento PA
                  </span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    Controle Sódico
                  </span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    Atividade Física
                  </span>
                </div>
              </div>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleStartProtocol('hipertensao')}
                className="px-6 py-3"
              >
                🩺 Iniciar Protocolo
              </Button>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <p className="text-orange-800 text-sm">
                <strong>Urgência:</strong> Média • <strong>Duração Estimada:</strong> 10-15 min
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Botão Finalizar Consulta */}
      <div className="flex justify-center pt-6">
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.location.href = '/dashboard'}
          className="px-8 py-4 text-lg mr-4"
        >
          ← Voltar ao Dashboard
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => alert('Consulta finalizada com sucesso! Retornando ao dashboard...')}
          className="px-8 py-4 text-lg"
        >
          ✅ Finalizar Consulta
        </Button>
      </div>
    </div>
  )
}

export default function AnamnesePage({ params }: { params: Promise<{ id: string }> }) {
  const [currentStep, setCurrentStep] = React.useState<'form' | 'results'>('form')

  const handleNext = () => {
    // Aqui você poderia salvar os dados antes de mudar
    setCurrentStep('results')
  }

  if (currentStep === 'results') {
    return <AnamneseResultsPage params={params} />
  }

  return (
    <div>
      <AnamneseFormPage params={params} onNext={handleNext} />
    </div>
  )
}
