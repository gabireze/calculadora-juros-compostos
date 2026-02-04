# Calculadora de Juros Compostos

> Ferramenta gratuita e open-source para simular investimentos com juros compostos, visualizar evolução patrimonial e comparar cenários de investimento

[![Next.js](https://img.shields.io/badge/Next.js-16.1-000000?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?logo=chartdotjs)](https://www.chartjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Funcionalidades

### Análise Completa de Investimentos
- **Cálculo de Juros Compostos** com aportes mensais
- **Visualização Gráfica**: Gráfico de pizza (composição) e evolução temporal
- **Tabela Detalhada**: Breakdown mensal ou anual do investimento
- **Múltiplas Configurações**: Taxa anual ou mensal, período em meses ou anos

### Interface Moderna
- **Design Responsivo** - funciona em mobile, tablet e desktop
- **Inputs Coloridos** - identificação visual por tipo de campo
- **Gráficos Interativos** - Chart.js com animações suaves
- **Toggle de Visualização** - alterne entre visão mensal e anual

### Recursos de Visualização
- **Gráfico de Composição**: Pizza mostrando capital investido vs juros
- **Evolução no Tempo**: Linha temporal do crescimento patrimonial
- **Tabela de Breakdown**: Visualização detalhada mês a mês ou ano a ano
- **Cards de Resultado**: Valor final, composição e multiplicador

## Demo

Acesse a aplicação localmente seguindo as instruções de instalação abaixo.

## Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 10+ (incluído com Node.js)

## Instalação

### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd calculadoras-simuladores-app
```

### 2. Instale as Dependências
```bash
npm install
```

## Como Usar

### Desenvolvimento
```bash
npm run dev
```
Acesse: `http://localhost:3000`

### Build para Produção
```bash
npm run build
```
Os arquivos compilados estarão em `.next/`

### Executar em Produção
```bash
npm start
```

## Deploy

### Deploy na Vercel (Recomendado)
1. Importe o projeto na [Vercel](https://vercel.com/new)
2. A Vercel detecta automaticamente Next.js
3. Deploy automático

### Deploy Manual (Netlify, outras plataformas)
```bash
npm run build
# Configure o diretório de build como .next/
```

## Arquitetura

```
src/
├── app/
│   └── page.tsx                      # Página principal
├── components/
│   ├── CompoundInterestCalculator.tsx # Componente principal e formulário
│   ├── ResultsDisplay.tsx            # Cards de resultado
│   ├── ChartsDisplay.tsx             # Gráficos (pizza e linha)
│   └── MonthlyTable.tsx              # Tabela de breakdown
├── lib/
│   └── compoundInterestCalculator.ts # Lógica de cálculo
└── globals.css                       # Estilos globais
```

## Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Next.js** | 16.1 | Framework React com SSR |
| **React** | 19.2 | Biblioteca de interface |
| **TypeScript** | 5.x | Linguagem de programação |
| **Tailwind CSS** | 4.x | Estilização com utility-first |
| **Chart.js** | 4.5 | Gráficos interativos |
| **react-chartjs-2** | 5.3 | Wrapper React para Chart.js |

## Algoritmo de Cálculo

### Fórmula de Juros Compostos
O cálculo utiliza capitalização mensal com aportes regulares:

```typescript
Para cada mês:
  1. Calcular juros sobre saldo atual: juros = saldo * (taxa_mensal)
  2. Adicionar juros ao saldo: saldo += juros
  3. Adicionar aporte mensal: saldo += aporte
  4. Acumular totais investidos e juros
```

### Conversões
- **Taxa anual para mensal**: `(1 + taxa_anual)^(1/12) - 1`
- **Período em anos para meses**: `anos * 12`

## Componentes

### CompoundInterestCalculator
Componente principal que gerencia:
- Estado dos inputs (valor inicial, aportes, taxa, período)
- Toggles de configuração (taxa anual/mensal, período mês/ano)
- Cálculo e exibição de resultados

### ResultsDisplay
Exibe três cards informativos:
- **Valor Final**: Total acumulado
- **Composição**: Percentual de capital investido vs juros
- **Multiplicador**: Quantas vezes o capital cresceu

### ChartsDisplay
Renderiza dois gráficos:
- **Doughnut Chart**: Composição visual (investido vs juros)
- **Line Chart**: Evolução temporal do patrimônio

Inclui toggle para alternar entre visualização mensal e anual.

### MonthlyTable
Tabela responsiva com colunas:
- Período (Mês/Ano)
- Investimento
- Juros do Período
- Juros Acumulados
- Total

Inclui toggle para alternar entre visualização mensal e anual.

## Estilização

### Cores dos Inputs
- **Azul** (`blue-*`): Valor inicial
- **Verde** (`green-*`): Valor mensal
- **Roxo** (`purple-*`): Taxa de juros
- **Índigo** (`indigo-*`): Período

### Design Responsivo
- **Mobile**: Layout vertical empilhado
- **Desktop** (sm: breakpoint): Layout horizontal em grid 2 colunas

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Ideias de Contribuição
- [ ] Adicionar mais tipos de investimento (juros simples, inflação)
- [ ] Implementar comparação entre múltiplos cenários
- [ ] Adicionar cálculo de impostos (IR sobre rendimentos)
- [ ] Exportar dados para CSV/Excel
- [ ] Adicionar histórico de simulações
- [ ] Implementar salvamento em localStorage
- [ ] Adicionar modo escuro

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Troubleshooting

### Erros de Build
- Certifique-se de que todas as dependências estão instaladas: `npm install`
- Limpe o cache do Next.js: `rm -rf .next`

### Gráficos não aparecem
- Abra o console do navegador (F12) para verificar erros
- Verifique se o Chart.js está instalado corretamente

### Problemas de Performance
- Reduza o período de simulação (menos meses)
- Desative animações dos gráficos se necessário

## Suporte

Para reportar bugs ou solicitar funcionalidades, abra uma issue no repositório.

---

Desenvolvido com Next.js, React e Chart.js
