# Convem Challenge

Este projeto foi desenvolvido como parte do desafio técnico da Convem, com o objetivo de integrar a API de Pix do Asaas para operações de depósitos (cash in) e saques (cash out).

## 🧩 Estrutura do Projeto

O projeto está organizado em um monorepo com as seguintes pastas:

- **`backend/`**: Contém a API desenvolvida em Node.js com TypeScript, responsável por lidar com as operações de cash in e cash out, integração com a API do Asaas, armazenamento no DynamoDB e envio de mensagens para o SQS.
- **`frontend/`**: Aplicação frontend construída com Next.js, que consome a API para exibir as transações realizadas.

## 🚀 Tecnologias Utilizadas

### Backend

- Node.js com TypeScript
- Express.js
- AWS SDK v3 (DynamoDB, SQS)
- dotenv
- uuid

### Frontend

- Next.js
- Tailwind CSS
- Shadcn/ui

### Infraestrutura

- AWS DynamoDB
- AWS SQS
- AWS Lambda
- Render (Hospedagem do backend)
- Vercel (Hospedagem do frontend)

## 📦 Funcionalidades

### 🏦 Cash In (Depósitos)

- Geração de QR Code Pix via API do Asaas.
- Armazenamento das informações da transação no DynamoDB.
- Recebimento de notificações via webhook do Asaas.
- Envio do payload do webhook para uma fila SQS.
- Função Lambda que processa as mensagens da fila e atualiza o status da transação no DynamoDB.
- Script de teste para criação de 100 QR Codes Pix.

### 💸 Cash Out (Saques)

- Solicitação de transferência via API do Asaas.
- Armazenamento das informações da transação no DynamoDB.
- Recebimento de notificações via webhook do Asaas.
- Envio do payload do webhook para uma fila SQS.
- Função Lambda que processa as mensagens da fila e atualiza o status da transação no DynamoDB.
- Script de teste para criação de 100 solicitações de cash out.

### 🖥️ Frontend

- Interface simples que exibe as transações salvas no DynamoDB, consumindo a API através de uma rota GET.

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js v18 ou superior
- AWS CLI configurado
- Conta na AWS com permissões para DynamoDB, SQS e Lambda

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```


## Scripts De Testes

```bash
cd backend/scripts
node generateCashIn.ts
```

```bash
cd backend/scripts
node generateCashOut.ts
```

## Endpoints da API

#### Cash-In

- POST /cashin/request/: cria um QR Code Pix

- POST /cashin/webhook: recebe o webhook da Asaas e envia para a fila SQS

#### Cash-Out

- POST /cashout: solicita uma transferência Pix

- POST /cashout/webhook: recebe o webhook da Asaas e envia para a fila SQS

### Payload de Exemplo

```json

{
  "value": 150,
  "description": "Depósito de teste",
  "cpfCnpj": "12345678909", // CPF válido de teste
  "name": "João da Silva"
}

```



### Discussão/Conclusão 

Para controlar o saldo do cliente de forma segura, é essencial implementar mecanismos de verificação de saldo antes de processar saques, garantindo que não haja saldo negativo. Além disso, é importante considerar a implementação de transações atômicas no DynamoDB para evitar condições de corrida e garantir a consistência dos dados.

#### Desafios:

- Sincronia de dados: evitar race conditions entre depósitos e saques.

- Falhas de processamento: garantir retries em caso de falha no webhook ou na Lambda.

- Validação de saldo: verificar saldo disponível antes de permitir saques.

#### Soluções sugeridas:

- Usar versionamento otimista no DynamoDB (ConditionExpression) para evitar sobreposição de dados.

- Implementar controle de saldo centralizado em uma Lambda segura.

- Monitoramento com logs e alertas para falhas nas filas.


