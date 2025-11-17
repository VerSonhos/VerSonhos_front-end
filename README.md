# 🌌 VerSonhos - Transformando a jornada de pequenos heróis com VR

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-563D7C?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 📋 Sobre o Projeto

O site da **VerSonhos** é um sistema de agendamentos projetado para facilitar a organização entre usuários e administradores. A plataforma permite que usuários solicitem horários disponíveis enquanto o administrador gerencia, confirma ou recusa solicitações de forma simples e eficiente.

O projeto conta com uma interface moderna, responsiva e estruturada em componentes, oferecendo:

🔹 Fluxo intuitivo para criação e acompanhamento de agendamentos

🔹 Painel administrativo completo para análise e controle das solicitações

🔹 Sistema de notificações e status automatizados

🔹 Arquitetura organizada e escalável, facilitando manutenção e futuras expansões

O objetivo do VerSonhos é entregar uma experiência rápida, confiável e eficiente para gestão de agendamentos em diversos contextos.

Repositório oficial do frontend:\
👉 **https://github.com/VerSonhos/VerSonhos_front-end**

Site oficial:\
👉 **https://versonhos.com.br**

---

## 🎯 Principais Funcionalidades do Sistema

### 👨‍💼 Administrador

#### 🏠 Home do Administrador
- Resumo rápido das informações importantes (solicitações pendentes, próximos agendamentos).

#### ⚙️ Configurações da Conta
- Alteração de senha e dados básicos.

#### 📋 Verificação de Solicitações
- Lista com filtro por status:
  - **Pendente**
  - **Confirmado**
  - **Negado**
  - **Expirado**

#### 📆 Status dos Agendamentos
- Visualização em **calendário + lista**, facilitando o acompanhamento.

### 👤 Usuário

#### 🏠 Home do Usuário
- Resumo do perfil e próximos agendamentos.

#### ⚙️ Configuração da Conta
- Edição de dados pessoais e preferências.

#### 📅 Agendamento
Processo simples dividido em passos:
1. Escolha da data (**somente datas disponíveis**)  
2. Confirmação do pedido  

#### 📊 Status dos Agendamentos
- Lista com o status atual.
- Possibilidade de **ler, alterar e cancelar** pelo modal.


### 🔄 Fluxo de Agendamento

1. 📥 O usuário faz uma solicitação de agendamento (somente em datas liberadas).  
2. 🕒 A solicitação deve ser revisada **até 48 horas antes** da data escolhida.  
3. ❌ Se não for revisada no prazo → **expira automaticamente**.


### 🟦 Status da Solicitação

- 🟡 **Pendente** — aguardando revisão.  
- 🟢 **Confirmado** — aprovado manualmente pelo administrador.  
- 🔴 **Negado** — rejeitado manualmente pelo administrador.  
- ⚫ **Expirado** — negado automaticamente por ultrapassar o prazo de 48h.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

-   **React 18+**
-   **JavaScript**
-   **Vite**
-   **Tailwind CSS**

### Deploy

-   **Vercel**: hospedagem do frontend

---

## 📁 Estrutura do Projeto

    VerSonhos_front-end/
    ├── public/                  
    ├── src/
    │   ├── assets/              
    │   ├── components/          
    │   ├── config/               
    │   ├── context/               
    │   ├── hooks/             
    │   ├── layouts/            
    │   ├── lib/
    |   ├── pages/
    |   ├── routes/
    |   ├── services/
    |   ├── styles/
    |   ├── utils/              
    │   └── main.jsx             
    ├── .gitignore
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── jsconfig.json
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── vercel.json
    ├── vite.config.js
    └── README.md

---

## 🔧 Como Rodar o Projeto Localmente

### 1. Pré-requisitos

-   **Node.js 18+**
-   **Git**

### 2. Clonar o Repositório

``` bash
git clone https://github.com/VerSonhos/VerSonhos_front-end.git
cd VerSonhos_front-end
```

### 3. Instalar Dependências

``` bash
npm install
```

### 4. Rodar o Servidor de Desenvolvimento

``` bash
npm run dev
```

Acesse em:\
👉 **http://localhost:5173**

---

## 🔐 Segurança

- **JWT** para autenticação
- **bcryptjs** para hash de senhas

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

- **✨ VerSonhos** - Realidades que curam, emoções que transformam.