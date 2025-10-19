'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'

interface DiabetesProtocolData {
  glicemia: {
    atual: string
    horarioRefeicao: string
    classificacao: 'Normal' | 'Pré-diabetes' | 'Diabetes'
  }
  pressaoArterial: {
    sistolica: string
    diastolica: string
    classificacao: string
  }
  questionario: {
    queixasVisuais: boolean
    feridasPes: boolean
    dormencia: boolean
    glicemiaJejum: boolean
  }
}

export default function DiabetesProtocolPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<'glicemia' | 'pressao' | 'questionario' | 'resultados'>('glicemia')

  const [protocolData, setProtocolData] = useState<DiabetesProtocolData>({
    glicemia: {
      atual: '',
      horarioRefeicao: '',
      classificacao: 'Normal'
    },
    pressaoArterial: {
      sistolica: '',
      diastolica: '',
      classificacao: ''
    },
    questionario: {
      queixasVisuais: false,
      feridasPes: false,
      dormencia: false,
      glicemiaJejum: false
    }
  })

  const handleGlicemiaChange = (field: keyof typeof protocolData.glicemia, value: string) => {
    let classificacao: 'Normal' | 'Pré-diabetes' | 'Diabetes' = 'Normal'

    if (field === 'atual' && value) {
      const valor = parseFloat(value)
      if (valor >= 126) {
        classificacao = 'Diabetes'
      } else if (valor >= 100) {
        classificacao = 'Pré-diabetes'
      }
    }

    setProtocolData(prev => ({
      ...prev,
      glicemia: {
        ...prev.glicemia,
        [field]: value,
        classificacao
      }
    }))
  }

  const handlePressaoChange = (field: keyof typeof protocolData.pressaoArterial, value: string) => {
    const sistolica = field === 'sistolica' ? parseFloat(value) : parseFloat(protocolData.pressaoArterial.sistolica)
    const diastolica = field === 'diastolica' ? parseFloat(value) : parseFloat(protocolData.pressaoArterial.diastolica)

    let classificacao = ''
    if (sistolica && diastolica) {
      if (sistolica >= 140 || diastolica >= 90) {
        classificacao = 'Hipertensão'
      } else if (sistolica >= 120 || diastolica >= 80) {
        classificacao = 'Pré-hipertensão'
      } else {
        classificacao = 'Normal'
      }
    }

    setProtocolData(prev => ({
      ...prev,
      pressaoArterial: {
        ...prev.pressaoArterial,
        [field]: value,
        classificacao
      }
    }))
  }

  const handleQuestionarioChange = (field: keyof typeof protocolData.questionario) => {
    setProtocolData(prev => ({
      ...prev,
      questionario: {
        ...prev.questionario,
        [field]: !prev.questionario[field]
      }
    }))
  }

  const renderGlicemiaStep = () => (
    <Card title="📊 Avaliação de Glicemia">
      <div className="space-y-6">
        <p className="text-gray-600">
          Informe os valores da glicemia do paciente para avaliação diagnóstica.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Atual (mg/dL)
            </label>
            <input
              type="number"
              value={protocolData.glicemia.atual}
              onChange={(e) => handleGlicemiaChange('atual', e.target.value)}
              placeholder="Ex: 120"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pague-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horário da Última Refeição
            </label>
            <input
              type="datetime-local"
              value={protocolData.glicemia.horarioRefeicao}
              onChange={(e) => handleGlicemiaChange('horarioRefeicao', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pague-blue focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classificação
              </label>
              <div className={`w-full px-4 py-3 rounded-xl border-2 font-semibold text-center ${protocolData.glicemia.classificacao === 'Diabetes'
                  ? 'bg-red-100 border-red-300 text-red-800'
                  : protocolData.glicemia.classificacao === 'Pré-diabetes'
                    ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                    : 'bg-green-100 border-green-300 text-green-800'
                }`}>
                {protocolData.glicemia.classificacao}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Valores de Referência</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Normal: 70-99 mg/dL</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Pré-diabetes: 100-125 mg/dL</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Diabetes: ≥ 126 mg/dL</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Pós-prandial: Menor que 140 mg/dL (normal), Maior que 200 mg/dL (diabetes)
          </p>
        </div>
      </div>
    </Card>
  )

  const renderPressaoStep = () => (
    <Card title="❤️ Pressão Arterial">
      <div className="space-y-6">
        <p className="text-gray-600">
          Meça e registre os valores da pressão arterial do paciente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sistólica (mmHg)
            </label>
            <input
              type="number"
              value={protocolData.pressaoArterial.sistolica}
              onChange={(e) => handlePressaoChange('sistolica', e.target.value)}
              placeholder="Ex: 120"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pague-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diastólica (mmHg)
            </label>
            <input
              type="number"
              value={protocolData.pressaoArterial.diastolica}
              onChange={(e) => handlePressaoChange('diastolica', e.target.value)}
              placeholder="Ex: 80"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pague-blue focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classificação
              </label>
              <div className={`w-full px-4 py-3 rounded-xl border-2 font-semibold text-center ${protocolData.pressaoArterial.classificacao === 'Hipertensão'
                  ? 'bg-red-100 border-red-300 text-red-800'
                  : protocolData.pressaoArterial.classificacao === 'Pré-hipertensão'
                    ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                    : 'bg-green-100 border-green-300 text-green-800'
                }`}>
                {protocolData.pressaoArterial.classificacao || 'Aguardando valores...'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Classificação da Pressão Arterial</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Normal: Menor que 120mmHg/Menor que 80mmHg</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Pré-hipertensão: 120-139mmHg/80-89mmHg</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Hipertensão: Maior ou igual a 140mmHg/Maior ou igual a 90mmHg</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  const renderQuestionarioStep = () => (
    <Card title="🔍 Questionário Clínico">
      <div className="space-y-6">
        <p className="text-gray-600">
          Marque as condições aplicáveis ao paciente baseadas no exame clínico.
        </p>

        <div className="space-y-4">
          {[
            {
              field: 'queixasVisuais',
              label: 'Queixas visuais (visão embaçada, dificuldade para ler)?',
              icon: '👁️'
            },
            {
              field: 'feridasPes',
              label: 'Feridas em pés ou pernas?',
              icon: '🦶'
            },
            {
              field: 'dormencia',
              label: 'Dormência/formigamento em extremidades?',
              icon: '👐'
            },
            {
              field: 'glicemiaJejum',
              label: 'Glicemia de jejum elevada?',
              icon: '🩸'
            }
          ].map((item, index) => (
            <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">{item.icon}</span>
              <span className="flex-1 text-gray-900">{item.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={protocolData.questionario[item.field as keyof typeof protocolData.questionario]}
                  onChange={() => handleQuestionarioChange(item.field as keyof typeof protocolData.questionario)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pague-blue"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )

  const renderResultadosStep = () => (
    <div className="space-y-6">
      <Card title="📈 Sumário Inteligente">
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
            <h4 className="font-semibold text-blue-900">Paciente apresenta sinais de Diabetes Tipo 2</h4>
            <p className="text-blue-800 mt-2">
              Baseado nas avaliações realizadas, o paciente necessita de atenção especial para controle glicêmico
              e monitoramento cardiovascular.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
              <h5 className="font-semibold text-green-900 mb-2">💊 Ajuste Medicamentoso</h5>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Organizar horários de medicação</li>
                <li>Verificar compliance terapêutica</li>
                <li>Considerar ajustes na dose</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
              <h5 className="font-semibold text-purple-900 mb-2">📋 Plano Alimentar</h5>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>Revisar plano alimentar atual</li>
                <li>Orientar distribuição de carboidratos</li>
                <li>Considerar monitoramento glicêmico</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <Card title="💊 Sugestão de Medicamentos e Exames">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Medicamentos Sugeridos</h4>
              <div className="space-y-3">
                {[
                  { name: 'Metformina 500mg', status: 'Disponível', price: 'R$ 5,12', quantity: '30 comprimidos' },
                  { name: 'Gliclazida 30mg', status: 'Disponível', price: 'R$ 8,50', quantity: '30 comprimidos' },
                ].map((med, idx) => (
                  <div key={idx} className="p-3 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-green-900">{med.name}</h5>
                        <p className="text-sm text-green-700">{med.quantity}</p>
                        <p className="text-sm font-semibold text-green-800">{med.price}</p>
                      </div>
                      <Chip variant="success" size="sm">
                        {med.status}
                      </Chip>
                    </div>
                  </div>
                ))}
                <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-red-900">Insulina Humana Regular</h5>
                      <p className="text-sm text-red-700">Bifásica 70/30 - 100UI/ml</p>
                      <p className="text-sm font-semibold text-red-800">R$ 45,00</p>
                    </div>
                    <Chip variant="warning" size="sm">
                      Indisponível
                    </Chip>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Exames Sugeridos</h4>
              <div className="space-y-3">
                {[
                  'Hemoglobina Glicada (HbA1c)',
                  'Glicemia de Jejum',
                  'Perfil Lipídico Completo',
                  'Microalbuminúria',
                  'Fundo de Olho'
                ].map((exam, idx) => (
                  <div key={idx} className="p-3 border border-gray-200 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">🔬 {exam}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  const steps = [
    { key: 'glicemia', label: 'Glicemia', component: renderGlicemiaStep },
    { key: 'pressao', label: 'Pressão Arterial', component: renderPressaoStep },
    { key: 'questionario', label: 'Questionário', component: renderQuestionarioStep },
    { key: 'resultados', label: 'Resultados', component: () => null }
  ]

  const currentStepIndex = steps.findIndex(step => step.key === currentStep)
  const currentStepData = steps[currentStepIndex]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Protocolo Diabetes</h1>
          <p className="text-gray-600">Avaliação especializada para paciente diabético</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          ← Voltar
        </Button>
      </div>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Progresso do Protocolo</h3>
          <span className="text-sm text-gray-600">
            Etapa {currentStepIndex + 1} de {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-pague-red h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {steps.map((step, index) => (
            <span
              key={step.key}
              className={index <= currentStepIndex ? 'font-semibold text-pague-red' : ''}
            >
              {step.label}
            </span>
          ))}
        </div>
      </Card>

      {currentStep === 'resultados' ? renderResultadosStep() : currentStepData.component()}

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={() => {
            if (currentStepIndex > 0) {
              setCurrentStep(steps[currentStepIndex - 1].key as typeof currentStep)
            }
          }}
          disabled={currentStepIndex === 0}
        >
          ← Anterior
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            if (currentStepIndex < steps.length - 1) {
              setCurrentStep(steps[currentStepIndex + 1].key as typeof currentStep)
            } else {
              alert('Protocolo de Diabetes concluído com sucesso!')
              router.push('/dashboard')
            }
          }}
        >
          {currentStepIndex === steps.length - 1 ? 'Finalizar Protocolo' : 'Próximo →'}
        </Button>
      </div>
    </div>
  )
}
