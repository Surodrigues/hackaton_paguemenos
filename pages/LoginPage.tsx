'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginPageProps {
  onLogin: (userType: 'farmaceutico' | 'administrador') => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simular validação
    setTimeout(() => {
      // Mock de usuários para demonstração
      const mockUsers = {
        '12345678901': { password: '123456', type: 'farmaceutico' as const },
        'admin': { password: 'admin123', type: 'administrador' as const },
        '98765432100': { password: 'farmacia', type: 'farmaceutico' as const }
      }

      const user = mockUsers[username as keyof typeof mockUsers]
      
      if (user && user.password === password) {
        onLogin(user.type)
      } else {
        setError('CPF/usuário ou senha inválidos. Tente novamente.')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Coluna Esquerda - 40% */}
      <div className="w-2/5 bg-pague-blue flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🏥</div>
          <h1 className="text-3xl font-bold mb-2">PagueMenos</h1>
          <p className="text-xl opacity-90">Sistema de Protocolos Farmacêuticos</p>
        </div>
      </div>

      {/* Coluna Direita - 60% */}
      <div className="w-3/5 bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-pague-red rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-xl font-bold">+</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Pague Menos</h1>
            </div>
            <p className="text-gray-600">Acesse sua conta para continuar</p>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu CPF ou usuário"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pagueMenos-blue focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pagueMenos-blue focus:border-transparent transition-colors"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pague-red text-white py-3 px-4 rounded-xl font-medium hover:bg-pague-red/90 focus:outline-none focus:ring-2 focus:ring-pague-red focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Entrando...
                </>
              ) : (
                <>
                  <span className="mr-2">🔑</span>
                  Logar
                </>
              )}
            </button>
          </form>

          {/* Informações de Demo */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Credenciais de Demonstração:</h3>
            <div className="text-xs text-blue-800 space-y-1">
              <p><strong>Farmacêutico:</strong> CPF: 12345678901 | Senha: 123456</p>
              <p><strong>Administrador:</strong> Usuário: admin | Senha: admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
