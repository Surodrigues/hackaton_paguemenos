// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { AuthUser } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Mock authentication
    const mockUsers = {
      '12345678901': { password: '123456', type: 'farmaceutico' as const },
      'admin': { password: 'admin123', type: 'administrador' as const },
      '98765432100': { password: 'farmacia', type: 'farmaceutico' as const }
    }

    const user = mockUsers[username as keyof typeof mockUsers]
    
    if (user && user.password === password) {
      const authUser: AuthUser = {
        id: username,
        name: username === 'admin' ? 'Administrador' : 'Farmacêutico',
        role: user.type,
        token: `mock-token-${username}-${Date.now()}`
      }

      return NextResponse.json({
        success: true,
        data: authUser,
        message: 'Login realizado com sucesso'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'CPF/usuário ou senha inválidos'
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor'
    }, { status: 500 })
  }
}
