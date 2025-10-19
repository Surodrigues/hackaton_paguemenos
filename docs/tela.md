# Prompt de Design e Desenvolvimento: Tela de Login - Sistema Farmacêutico

## 1. Contexto do Projeto

Este é o ponto de entrada para um sistema de gestão de protocolos focado em otimizar o atendimento farmacêutico. O objetivo é agilizar a coleta de dados de pacientes (doenças, nome, CPF, idade, etc.) para gerar um protocolo de atendimento rápido e eficiente.

**Perfis de Acesso:**
* **Farmacêutico:** Acessa o sistema para registrar pacientes, consultar e gerar protocolos de atendimento. O login é feito via CPF.
* **Administrador:** Possui acesso total ao sistema, com permissões para gerenciar dados sensíveis, editar e criar novos modelos de protocolos.

---

## 2. Descrição da Interface de Login (Tela Atual)

A interface deve seguir a identidade visual apresentada na imagem de referência, com um layout de duas colunas.

### 2.1. Layout Geral

* **Coluna Esquerda (40% da tela):**
    * Preenchimento total com a cor azul primária da marca (ex: `Royal Blue`, `#0000CD`).
    * Sem conteúdo, servindo como um elemento de design sólido e de contraste.

* **Coluna Direita (60% da tela):**
    * Fundo branco (`#FFFFFF`).
    * Todo o conteúdo alinhado verticalmente ao centro.

### 2.2. Conteúdo da Coluna Direita

1.  **Logo:**
    * Centralizado no topo da seção.
    * Composto pelo ícone (cruz vermelha em um quadrado de cantos arredondados) e o texto "Pague Menos" ao lado, conforme a imagem.

2.  **Formulário de Login:**
    * **Campo "Usuário":**
        * **Label:** "Usuário"
        * **Input:** Campo de texto para inserção do CPF (para farmacêuticos) ou nome de usuário (para administradores). O placeholder pode ser "Digite seu CPF ou usuário".
        * *Nota: Ignorar os elementos "mg/dL" e a seta de dropdown da imagem, pois não se aplicam a um campo de usuário/CPF.*

    * **Campo "Senha":**
        * **Label:** "Senha"
        * **Input:** Campo de texto do tipo `password` para mascarar os caracteres.
        * *Nota: Ignorar os elementos "mg/dL" e a seta de dropdown.*

    * **Botão "Logar":**
        * **Estilo:** Botão com preenchimento total na cor vermelha primária (ex: `#FE1A4B`), texto em branco e cantos arredondados.
        * **Conteúdo:** Texto "Logar" acompanhado de ícones que remetam a "entrar" ou "segurança" (ex: ícone de uma chave ou fechadura).

---

## 3. Fluxo de Interação e Transição

### 3.1. Validação

* O sistema deve validar se os campos "Usuário" e "Senha" estão preenchidos.
* Ao submeter, o sistema deve autenticar as credenciais e identificar o tipo de usuário (`Farmacêutico` ou `Administrador`).

### 3.2. Integração com a Próxima Tela (Pós-Login)

**Cenário de Sucesso:**
* Após a autenticação bem-sucedida, o usuário deve ser redirecionado para o *Dashboard* principal correspondente ao seu perfil.
    * **Se o usuário for `Farmacêutico`:** Redirecionar para a tela de **Busca de Paciente/Início de Atendimento**.
    * **Se o usuário for `Administrador`:** Redirecionar para a tela de **Painel de Controle Administrativo**, com visão geral dos dados e acesso às ferramentas de edição de protocolos.

**Cenário de Falha:**
* Se as credenciais estiverem incorretas, uma mensagem de erro clara e amigável deve ser exibida abaixo do botão de login (ex: "CPF/usuário ou senha inválidos. Tente novamente.").