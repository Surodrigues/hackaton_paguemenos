# Pague Menos - Sistema de Gerenciamento Farmacêutico
## Documentação Técnica para Desenvolvimento

### Visão Geral do Sistema

O sistema Pague Menos é uma plataforma de gerenciamento farmacêutico focada em melhorar o atendimento ao cliente através da geração automatizada de protocolos médicos. O sistema coleta dados dos pacientes como doenças, informações pessoais, CPF, idade, e outros dados relevantes para criar protocolos personalizados que auxiliam os farmacêuticos no atendimento.

### Especificações Técnicas

- **Framework**: NextJS 15 com App Router
- **Estilo**: Tailwind CSS
- **Ícones**: Phosphor Icons
- **Cores Principais**: 
  - Vermelho: `#FF2342`
  - Azul: `#0000BE`
- **Tipo**: MVP (Minimum Viable Product)

### Estrutura de Pastas Recomendada

```
src/
├── app/                          # App Router NextJS 15
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página inicial
│   ├── login/
│   │   └── page.tsx             # Tela de login
│   ├── dashboard/
│   │   ├── layout.tsx           # Layout do dashboard
│   │   ├── page.tsx             # Dashboard principal
│   │   └── paciente/
│   │       ├── [id]/
│   │       │   ├── page.tsx     # Perfil do paciente
│   │       │   ├── anamnese/
│   │       │   │   └── page.tsx # Anamnese
│   │       │   └── protocolo/
│   │       │       └── [tipo]/
│   │       │           └── page.tsx # Protocolos específicos
│   │       └── atendimento/
│   │           └── page.tsx     # Iniciar atendimento
│   └── api/                     # API Routes
├── components/                  # Componentes reutilizáveis
│   ├── ui/                     # Componentes de UI básicos
│   ├── forms/                  # Componentes de formulário
│   ├── navigation/             # Componentes de navegação
│   └── layout/                 # Componentes de layout
├── lib/                        # Utilitários e configurações
├── types/                      # Definições TypeScript
├── hooks/                      # Custom React hooks
└── styles/                     # Estilos globais
```

## Análise Detalhada das Telas

### 1. Tela de Login

**Rota**: `/login`

**Componentes**:
- Logo do Pague Menos
- Campo de usuário (formato: 000.000.000-00)
- Campo de senha
- Botão "Logar" (cor: #FF2342)

**Implementação sugerida**:
```typescript
// components/forms/LoginForm.tsx
import { useState } from 'react'
import { User, Lock } from '@phosphor-icons/react'

export default function LoginForm() {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#0000BE]"></div>
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg shadow-lg inline-block">
              <div className="text-[#FF2342] font-bold text-xl">
                <span className="bg-[#FF2342] text-white p-2 rounded mr-2">+</span>
                Pague<br/>Menos
              </div>
            </div>
          </div>
          {/* Form fields */}
        </div>
      </div>
    </div>
  )
}
```

### 2. Dashboard Principal (Início)

**Rota**: `/dashboard`

**Componentes**:
- Navegação lateral com ícones (Phosphor Icons)
- Header com informações do usuário logado
- Área principal de conteúdo

**Menu de navegação**:
- Início (House icon)
- Pacientes (Users icon)
- Atendimentos (Calendar icon)
- Acompanhamento (ChartLine icon)
- Relatórios (FileText icon)
- Protocolos (Clipboard icon)
- Configurações (Gear icon)

**Conteudo tela inicial**
-Titulo: BUscar paciente
-Label: CPF:
-Input: insira o cpf
-tag: nome do paciente
- ao lado da tag: botão "perfil" que redireciona para o perfl do paciente(cor: #FF2342)

-ao lado desse card, mostrand alertas inteligentes de saude do paciente. o background do card terá cor cor: #FF2342 e textos em branco

-no card abaixo, terá um 3 cards: mostrando atendimentos do dia, pacientes ativos no cadastro, consultas na semana

- Card com uma listagem de pacientes recentes



### Pacientes

**Rota**: /dashboard/pacientes

- Listagem de pacientes com opçẽs de filtro

### 3. Perfil do Paciente

**Rota**: `/dashboard/paciente/[id]`

**Dados exibidos exemplo**:
- Nome completo: Pedro Henrique
- Data de nascimento: 15/12/2000
- Idade: 23 anos
- Gênero: Masculino
- Condições: Diabete, Hipertensão

Botao de agendar, editar iniciar atendimento manda para /dashboard/paciente/[id]/anamnese`

**Seções principais**:

#### a) Últimos Atendimentos
Tabela com:
- Data
- Protocolo aplicado
- Status (Agendado, Realizado, Cancelado)

#### b) Alertas
Cards informativos:
- Remédio de diabetes acabando (vermelho)
- Teve queda capilar (amarelo)
- Teve diarréia (amarelo)

#### c) Protocolos Sugeridos
- Diabete (botão "Iniciar")
- Hipertensão (botão "Iniciar")



### 4. Telas de Anamnese

**Rota**: `/dashboard/paciente/[id]/anamnese`

Sequência de telas para coleta de dados:

#### Etapa
- COndição de saúde (um droplist para selecionar, ao selecionar, aparece as tags slecionads abaixo)
- REmedios em uso (um dropdown par seleciona, aparece as tags slecionads abaixo)

#### Etapa: Sintomas Iniciais
- Pergunta: "Quais sintomas tem sentido recentemente?"
- Campo de texto livre

#### Etapa: Dados Físicos
- Peso: 52 kg
- Altura: 1,62 m
- IMC: 17 (calculado automaticamente)

#### Etapa: Condições e Hábitos
Perguntas com opções sim/não:
- Possui algum problema de saúde crônico?
- Possui alguma alergia de medicamento, alimento ou substância?
- Como está sua alimentação, prática de atividades físicas e hábitos de vida?

Checkboxes:
- Álcool
- Droga  
- Cigarro

#### Etapa : Análise Inteligente
Sistema apresenta:
- Paciente relata queixas de hipoglicemia
- Glicemia de jejum acima do ideal nos últimos exames

**Recomendações**:
- Ajustar horários de medicação
- Revisar plano alimentar
- Considerar monitoramento contínuo de glicose

### 5. Protocolo de Diabetes

**Rota**: `/dashboard/paciente/[id]/protocolo/diabetes`

**Campos de avaliação**:

#### Glicemia
- Valor atual: 12 mg/dL
- Data e hora da última refeição: 15/10/2025 às 19h00
- Valores de referência:
  - Jejum: 70-99 mg/dL (normal), 100-125 mg/dL (pré-diabetes), >126 mg/dL (diabetes)
  - Pós-prandial (2h após refeição): <140 mg/dL (normal), ≥200 mg/dL (diabetes)

#### Pressão Arterial
- Sistólica: 120 mmHg
- Diastólica: 80 mmHg
- Referências:
  - Normal: <120/80 mmHg
  - Pré-hipertensão: 120-139/80-89
  - Hipertensão: ≥140/90

#### Questionário Clínico
Perguntas sim/não:
- Queixas visuais (visão embaçada, dificuldade para ler)?
- Feridas em pés ou pernas?
- Dormência/formigamento em extremidades?
- Glicemia de jejum

####. REsumo iteigente e Sugestão de Medicamentos e exames

Tabs para Medicamento e Exames
**Tipos de medicamento**:
- Disponível (fundo verde): Metformina 500mg - 30 Comprimidos, R$ 5,12
- Indisponível (fundo vermelho): Metformina, R$ 25,00

**Informações exibidas**:
- Nome do medicamento
- Dosagem e quantidade
- Categoria (Anti-hipertensivo)
- Status de disponibilidade
- Preço

**

### 7. Agendar Retorno

**Rota**: `/dashboard/paciente/[id]/retorno`

Interface para agendamento de consultas de acompanhamento.




## Componentes de UI Sugeridos

### Estrutura de Cores Tailwind

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        'pague-red': '#FF2342',
        'pague-blue': '#0000BE',
      }
    }
  }
}
```

### Componentes Base

#### 1. Button Component
```typescript
// components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-pague-red text-white hover:bg-pague-red/90",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button 
      className={buttonVariants({ variant, size, className })} 
      {...props} 
    />
  )
}
```

#### 2. Input Component
```typescript
// components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-pague-blue 
                     focus:border-transparent ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)
```

#### 3. Card Component
```typescript
// components/ui/Card.tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 
                    shadow-sm p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
```

#### 4. Navigation Sidebar
```typescript
// components/navigation/Sidebar.tsx
import { 
  House, Users, Calendar, ChartLine, 
  FileText, Clipboard, Gear 
} from '@phosphor-icons/react'

const menuItems = [
  { icon: House, label: 'Início', href: '/dashboard' },
  { icon: Users, label: 'Pacientes', href: '/dashboard/pacientes' },
  { icon: Calendar, label: 'Atendimentos', href: '/dashboard/atendimentos' },
  { icon: ChartLine, label: 'Acompanhamento', href: '/dashboard/acompanhamento' },
  { icon: FileText, label: 'Relatórios', href: '/dashboard/relatorios' },
  { icon: Clipboard, label: 'Protocolos', href: '/dashboard/protocolos' },
  { icon: Gear, label: 'Configurações', href: '/dashboard/configuracoes' },
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-pague-blue text-white min-h-screen">
      <div className="p-4">
        <div className="text-xl font-bold mb-8">
          <span className="bg-pague-red p-2 rounded mr-2">+</span>
          Pague Menos
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center space-x-3 p-3 rounded-lg 
                       hover:bg-blue-600 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
```

### 5. Alert Component
```typescript
// components/ui/Alert.tsx
import { ReactNode } from 'react'
import { Warning, Info, CheckCircle, X } from '@phosphor-icons/react'

interface AlertProps {
  children: ReactNode
  variant: 'warning' | 'info' | 'success' | 'error'
  onClose?: () => void
}

export function Alert({ children, variant, onClose }: AlertProps) {
  const variants = {
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: Warning,
      iconColor: 'text-yellow-400'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200', 
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-400'
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800', 
      icon: CheckCircle,
      iconColor: 'text-green-400'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: X,
      iconColor: 'text-red-400'
    }
  }

  const config = variants[variant]
  const Icon = config.icon

  return (
    <div className={`rounded-md border p-4 ${config.bg}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${config.iconColor}`} />
        </div>
        <div className={`ml-3 ${config.text}`}>
          {children}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 
                     hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
```

## Tipos TypeScript Sugeridos

```typescript
// types/patient.ts
export interface Patient {
  id: string
  name: string
  cpf: string
  birthDate: string
  age: number
  gender: 'Masculino' | 'Feminino'
  conditions: string[]
  createdAt: Date
  updatedAt: Date
}

// types/appointment.ts
export interface Appointment {
  id: string
  patientId: string
  date: string
  protocol: string
  status: 'Agendado' | 'Realizado' | 'Cancelado'
  notes?: string
}

// types/protocol.ts
export interface Protocol {
  id: string
  name: string
  type: 'diabetes' | 'hypertension' | 'general'
  questions: Question[]
  createdAt: Date
}

export interface Question {
  id: string
  text: string
  type: 'text' | 'number' | 'boolean' | 'select'
  options?: string[]
  required: boolean
  validation?: ValidationRule[]
}

// types/medication.ts
export interface Medication {
  id: string
  name: string
  dosage: string
  quantity: number
  price: number
  available: boolean
  category: string
  description?: string
}

// types/anamnesis.ts
export interface Anamnesis {
  id: string
  patientId: string
  symptoms: string
  weight: number
  height: number
  bmi: number
  chronicConditions: boolean
  allergies: boolean
  lifestyle: {
    alcohol: boolean
    drugs: boolean
    smoking: boolean
  }
  createdAt: Date
}
```

## Hooks Customizados Sugeridos

```typescript
// hooks/usePatient.ts
import { useState, useEffect } from 'react'
import { Patient } from '@/types/patient'

export function usePatient(patientId: string) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Implementar busca do paciente
    fetchPatient(patientId)
  }, [patientId])

  const fetchPatient = async (id: string) => {
    try {
      setLoading(true)
      // API call simulation
      const response = await fetch(`/api/patients/${id}`)
      const data = await response.json()
      setPatient(data)
    } catch (err) {
      setError('Erro ao carregar paciente')
    } finally {
      setLoading(false)
    }
  }

  return { patient, loading, error, refetch: () => fetchPatient(patientId) }
}

// hooks/useProtocol.ts
export function useProtocol(protocolType: string) {
  const [protocol, setProtocol] = useState(null)
  const [responses, setResponses] = useState({})

  const updateResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const submitProtocol = async () => {
    // Implementar envio do protocolo
    try {
      const response = await fetch('/api/protocols/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ protocolType, responses })
      })
      return await response.json()
    } catch (error) {
      throw new Error('Erro ao enviar protocolo')
    }
  }

  return { protocol, responses, updateResponse, submitProtocol }
}
```

## Configurações de Desenvolvimento

### package.json
```json
{
  "name": "pague-menos-system",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@phosphor-icons/react": "^2.1.7",
    "tailwindcss": "^3.4.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "typescript": "^5.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pague-red': '#FF2342',
        'pague-blue': '#0000BE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
}

module.exports = nextConfig
```

## Estrutura de API Routes

```
src/app/api/
├── auth/
│   ├── login/
│   │   └── route.ts
│   └── logout/
│       └── route.ts
├── patients/
│   ├── route.ts
│   ├── [id]/
│   │   └── route.ts
│   └── search/
│       └── route.ts
├── protocols/
│   ├── route.ts
│   ├── [type]/
│   │   └── route.ts
│   └── submit/
│       └── route.ts
├── appointments/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
├── medications/
│   ├── route.ts
│   └── suggestions/
│       └── route.ts
└── anamnesis/
    ├── route.ts
    └── [patientId]/
        └── route.ts
```

## Considerações de Segurança

1. **Autenticação**: Implementar JWT para sessões
2. **Autorização**: Controle de acesso baseado em roles
3. **LGPD**: Conformidade com lei de proteção de dados
4. **Validação**: Sanitização de inputs do usuário
5. **HTTPS**: Comunicação segura obrigatória
6. **Auditoria**: Log de todas as ações sensíveis

## Performance

1. **Code Splitting**: Usar dynamic imports do Next.js
2. **Caching**: Implementar cache de dados do paciente
3. **Lazy Loading**: Carregar componentes sob demanda  
4. **Otimização de Imagens**: Usar next/image
5. **Bundle Analysis**: Monitorar tamanho do bundle

## Próximos Passos

1. Configurar ambiente de desenvolvimento
2. Implementar autenticação e autorização
3. Criar componentes base de UI
4. Desenvolver telas principais seguindo o design
5. Implementar lógica de protocolos médicos
6. Adicionar validações de formulário
7. Testes unitários e de integração
8. Deploy e monitoramento

---

Este documento serve como base para o desenvolvimento do sistema Pague Menos, seguindo as melhores práticas do NextJS 15 e Tailwind CSS, com foco na experiência do usuário farmacêutico.