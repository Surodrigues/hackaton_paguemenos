import React, { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'

interface AnamnesePageProps {
  patient: {
    name: string
    conditions: string[]
    medications: string[]
  }
  onNext: () => void
  onBack: () => void
}

export default function AnamnesePage({ patient, onNext, onBack }: AnamnesePageProps) {
  const [chronicHealth, setChronicHealth] = useState('')
  const [allergies, setAllergies] = useState('')
  const [lifestyle, setLifestyle] = useState('')
  const [habits, setHabits] = useState({
    smoking: false,
    alcohol: false,
    tobacco: false
  })

  // Verificação para evitar erros durante prerendering
  if (!patient) {
    return <div>Carregando...</div>
  }

  const handleHabitToggle = (habit: keyof typeof habits) => {
    setHabits(prev => ({
      ...prev,
      [habit]: !prev[habit]
    }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Anamnese</h1>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold text-gray-700">{patient.name}</span>
          <Button variant="outline" onClick={onBack}>
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
              value={chronicHealth}
              onChange={(e) => setChronicHealth(e.target.value)}
              placeholder="Descreva os problemas de saúde crônicos..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Pergunta 2 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Possui alguma alergia de medicamento, alimento ou substância?
            </h3>
            <textarea
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="Descreva as alergias conhecidas..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Pergunta 3 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Como está sua alimentação, prática de atividades físicas e hábitos de vida (álcool, tabaco)?
            </h3>
            <textarea
              value={lifestyle}
              onChange={(e) => setLifestyle(e.target.value)}
              placeholder="Descreva seus hábitos de vida..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
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
                habits.smoking
                  ? 'bg-brand-red text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fuma
            </button>
            <button
              onClick={() => handleHabitToggle('alcohol')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                habits.alcohol
                  ? 'bg-brand-red text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Álcool
            </button>
            <button
              onClick={() => handleHabitToggle('tobacco')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                habits.tobacco
                  ? 'bg-brand-red text-white'
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

