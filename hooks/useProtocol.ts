// hooks/useProtocol.ts
import { useState } from 'react'
import { Protocol, Question } from '@/types'

export function useProtocol(protocolType: string) {
  const [protocol, setProtocol] = useState<Protocol | null>(null)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)

  const updateResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const submitProtocol = async () => {
    setLoading(true)
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockResponse = {
        success: true,
        recommendations: [
          'Ajustar horários de medicação',
          'Revisar plano alimentar',
          'Considerar monitoramento contínuo de glicose'
        ],
        medications: [
          {
            id: '1',
            name: 'Metformina',
            dosage: '500mg',
            quantity: 30,
            price: 5.12,
            available: true,
            category: 'Anti-diabético'
          }
        ]
      }
      
      return mockResponse
    } catch (error) {
      throw new Error('Erro ao enviar protocolo')
    } finally {
      setLoading(false)
    }
  }

  const loadProtocol = async (type: string) => {
    setLoading(true)
    try {
      // Mock protocol data
      const mockProtocol: Protocol = {
        id: '1',
        name: `Protocolo ${type}`,
        type: type as any,
        questions: [
          {
            id: '1',
            text: 'Qual o valor da glicemia atual?',
            type: 'number',
            required: true,
            validation: [
              { type: 'min', value: 0, message: 'Valor deve ser maior que 0' },
              { type: 'max', value: 1000, message: 'Valor deve ser menor que 1000' }
            ]
          },
          {
            id: '2',
            text: 'Possui queixas visuais?',
            type: 'boolean',
            required: false
          }
        ],
        createdAt: new Date()
      }
      
      await new Promise(resolve => setTimeout(resolve, 500))
      setProtocol(mockProtocol)
    } catch (error) {
      console.error('Erro ao carregar protocolo:', error)
    } finally {
      setLoading(false)
    }
  }

  return { 
    protocol, 
    responses, 
    loading,
    updateResponse, 
    submitProtocol,
    loadProtocol
  }
}
