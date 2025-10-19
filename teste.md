1.  **Barra de Navegação Lateral (Menu):** Liste os itens do menu (Início, Pacientes, Atendimentos, Acompanhamento, Relatórios, Protocolos).
2.  **Dados do Paciente (Cabeçalho Central):**
    * Nome completo: Pedro Henrique
    * Data de Nascimento: 15/12/2000
    * Idade: 23 anos
    * Gênero: Masculino
    * Condições (Tags/Badges): Diabetes, Hipertensão
    * Botão de Ação: Editar
3.  **Últimos Atendimentos (Seção Central Principal):**
    * Título: Últimos atendimentos
    * Sub-abas: `atendimentos` (selecionada), `medicamentos`
    * Lista de Atendimentos (todos datados de "14 de julho"):
        * Vacina
        * Vacina
        * Vacina
        * Vacina
4.  **Alertas (Coluna Lateral Direita - Superior):**
    * Título: Alertas
    * Lista de alertas com datas:
        * Tratamento de diabete em andamento
        * Teve queda capilar: há 1 semana
        * Teve diarreia: há 2 semanas
5.  **Protocolos Recomendados (Coluna Lateral Direita - Inferior):**
    * Título: Protocolos Recomendados
    * Lista de protocolos com botão "Iniciar":
        * Diabete (Iniciar)
        * Diabete (Iniciar)
6.  **Botão de Ação Principal (Inferior Direita):**
    * Botão de cor vermelha: Iniciar Atendimento

Crie uma tela chamada *Anamnese* conforme o layout da imagem fornecida.  
Use *React + TailwindCSS* (ou o framework padrão do projeto, se já definido).

---

## Objetivo
Construir uma interface de *Anamnese de Paciente* com base no design apresentado, garantindo boa organização visual, responsividade e uso de componentes reutilizáveis.

---

## Estrutura da Página

### Cabeçalho
- *Título à esquerda:* Anamnese
- *Nome do paciente à direita:* Pedro Henrique
- Ambos em *negrito* e alinhados horizontalmente.

---

### Seção: Condição de Saúde
- Campo de texto *cinza e desabilitado*, simulando área informativa.
- Abaixo, exibir *chips* (ou botões arredondados) com rótulos como:
  - Diabetes
  - (permitir múltiplas condições no futuro)

---

### Seção: Remédios em uso
- Campo de texto *cinza e desabilitado*, simulando área informativa.
- Abaixo, exibir *chips* com os medicamentos em uso, ex.:
  - Metformina

---

### Botão de Ação
- Botão *"Próximo"* no canto inferior direito:
  - Cor: bg-red-500 hover:bg-red-600 text-white
  - Estilo: rounded px-4 py-2 font-medium
  - Ação temporária: console.log("Próximo clicado")

---

## Menu Lateral (Sidebar)

Sidebar fixa à esquerda com fundo *azul escuro (bg-blue-800)* e ícones/brilhos brancos.  
Itens do menu:

1. Início  
2. Pacientes  
3. Atendimentos  
4. Acompanhamento  
5. Relatórios  
6. Protocolos  

Cada item com ícone e texto alinhados horizontalmente.

---

## Componentes sugeridos

- Sidebar – menu lateral  
- PageHeader – título + nome do paciente  
- Chip – componente reutilizável para tags (condições e medicamentos)  
- PrimaryButton – botão padrão (ex: Próximo)

---

## Estilo e Layout

- Usar *TailwindCSS* para espaçamentos e responsividade:
  - p-4, gap-4, rounded-2xl, shadow-md
- Layout principal com *grid* ou *flex*:
  - Sidebar fixa
  - Conteúdo principal com padding lateral
- Garantir responsividade em telas pequenas.

---

## Mock de Dados (exemplo)

```jsx
const patient = {
  name: "Pedro Henrique",
  conditions: ["Diabetes"],
  medications: ["Metformina"]
};


## Contexto
Crie duas telas em layout web responsivo (largura base 1440px) para uma aplicação de saúde chamada *FarmaIA*.  
As telas fazem parte do *módulo de atendimento farmacêutico* e devem seguir estilo limpo, clínico e profissional, com foco em legibilidade e clareza.

---

## 🎨 Guia Visual

### Paleta de cores
- *Branco (fundo principal):* #FFFFFF  
- *Cinza claro (cards e seções secundárias):* #E0E0E0  
- *Cinza médio (botões desativados e abas):* #C9C1BD  
- *Cinza escuro (texto secundário):* #4A4A4A  
- *Preto (texto principal):* #000000  
- *Vermelho (botões de ação principal):* #E53935  
- *Hover do botão vermelho:* #C62828  

### Tipografia
- Fonte: *Inter*, sans-serif  
- Títulos: *bold*, tamanhos entre 24px e 32px  
- Subtítulos / Seções: *semibold*, 18px a 20px  
- Texto comum: *regular*, 14px a 16px  
- Linhas: 1.4x a 1.6x do tamanho da fonte  
- Espaçamento entre blocos: 16px a 24px  

---

## 🧩 Tela 1 — Detalhes do Paciente

### Estrutura geral
- Fundo branco (#FFFFFF) centralizado com margem superior de 40px e laterais de 10% da tela.  
- Sidebar inexistente — todo o conteúdo é centralizado no bloco principal.
- Margem interna (padding): 32px.  

### Cabeçalho
- Nome: *Pedro Henrique* — fonte 28px, bold, cor #000.  
- Subinformações (data de nascimento, idade, gênero):  
  - Fonte 16px, regular, cor #4A4A4A.  
  - Layout horizontal com espaçamento de 24px entre itens.  
- Botão “Editar”:  
  - Alinhado à direita.  
  - Texto “Editar” em bold 16px + ícone quadrado cinza (#BDBDBD) de 24x24px.  

### Navegação (abas)
- Duas abas: *atendimentos* e *medicamentos*.  
- Abas em minúsculo, fonte bold 14px.  
- Aba ativa com fundo cinza médio (#C9C1BD), texto preto.  
- Aba inativa com fundo branco, texto preto opaco (60%).  
- Espaçamento horizontal entre abas: 16px.  
- Padding vertical das abas: 8px.

### Conteúdo principal — Medicamentos comprados
- Título: “Medicamentos comprados” — fonte bold 22px, cor #000.  
- Lista simples com espaçamento de 12px entre itens.  
- Cada item: texto “Vacina14 de julho” — 16px regular, cor #000.

### Painel lateral direito
#### Card 1 — Alertas
- Fundo cinza claro (#E0E0E0), raio de borda 4px, padding 16px.  
- Título: “Alertas” — 18px bold, preto.  
- Lista de alertas com texto regular 14px preto, espaçamento 8px.  

#### Card 2 — Protocolos recomendados
- Mesmo estilo de card (fundo #E0E0E0, padding 16px, bordas arredondadas).  
- Título: “Protocolos recomendados” — 18px bold, preto.  
- Linhas com:
  - Nome do protocolo (ex: “Diabetes”) — 14px regular.  
  - Botão “Iniciar” à direita — 14px semibold, fundo #BDBDBD, texto preto, 60x28px.  
  - Espaçamento entre linhas: 12px.

### Botão principal
- Localizado no canto inferior direito.  
- Texto: “Iniciar Atendimento” — branco, bold 16px.  
- Fundo: vermelho (#E53935), raio 8px, padding 12px 24px.  

---

## 🩺 Tela 2 — Anamnese

### Estrutura
- Mesmo layout centralizado e fundo branco.
- Margem superior: 40px, padding interno: 32px.  
- Duas colunas: esquerda (título) e direita (nome do paciente).

### Cabeçalho
- Título: “Anamnese” — bold 28px, cor #000.  
- À direita: “Pedro Henrique” — bold 24px, cor #000.  
- Alinhamento horizontal, espaço entre os dois blocos.  

### Perguntas
Cada pergunta deve ser um bloco com:
- Texto da pergunta — bold 16px, cor #000, espaçamento inferior de 16px.  
- Espaçamento vertical entre perguntas: 32px.  
- Perguntas:
  1. Possui algum problema de saúde crônico?  
  2. Possui alguma alergia de medicamento, alimento ou substância?  
  3. Como está sua alimentação, prática de atividades físicas e hábitos de vida (álcool, tabaco)?

### Seção — Hábitos de Vida
- Subtítulo: “Hábitos de Vida (últimos 6 meses)” — bold 16px.  
- Três botões tipo toggle:
  - “Fuma”, “Álcool”, “Tabaco”  
  - Estilo: fundo #C9C1BD, texto preto, 14px semibold, raio 4px, padding 8px 16px.  
  - Espaçamento horizontal: 12px.

### Botão “Próximo”
- Localizado canto inferior direito.  
- Fundo vermelho (#E53935), texto branco bold 14px, raio 8px, padding 10px 20px.  
- Hover: escurecer para #C62828.

---

## 🧠 Estilo Geral
- Layout minimalista, espaços em branco amplos.
- Borda arredondada leve (4px–8px) em cards e botões.  
- Ícones monocromáticos (tons de cinza).  
- Hierarquia de informação bem definida, foco em tipografia.

---

## ⚙️ Saída esperada
Gere a estrutura visual fiel às descrições acima em layout web moderno, prontos para prototipagem interativa (React ou Figma).  
Mantenha a consistência tipográfica e cromática entre ambas as telas.