'use client';

import { CalculationResult } from '@/lib/compoundInterestCalculator';
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartsDisplayProps {
  result: CalculationResult;
  period: number;
  periodUnit: 'months' | 'years';
}

export default function ChartsDisplay({ result }: ChartsDisplayProps) {
  const [chartViewMode, setChartViewMode] = useState<'monthly' | 'annual'>('monthly');
  // Doughnut chart data
  const formatCurrency = (value: number) => {
    if (typeof value !== 'number' || isNaN(value)) return '0,00';
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const doughnutData = {
    labels: [
      `Total Acumulado: R$ ${formatCurrency(result.totalFinal)}`,
      `Valor Investido: R$ ${formatCurrency(result.totalInvested)}`,
      `Total em Juros: R$ ${formatCurrency(result.totalJuros)}`
    ],
    datasets: [
      {
        data: [result.totalFinal || 0, result.totalInvested || 0, result.totalJuros || 0],
        backgroundColor: ['#3b82f6', '#10b981', '#9333ea'],
        borderColor: ['#2563eb', '#059669', '#7e22ce'],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  // Line chart data - show data by month or by year depending on viewMode
  const totalMonths = result.monthlyData.length;
  const showMonthly = chartViewMode === 'monthly';
  const filteredData = showMonthly 
    ? result.monthlyData 
    : result.monthlyData.filter((d: typeof result.monthlyData[0]) => d.month % 12 === 11 || d.month === totalMonths - 1);

  const lineLabels = filteredData.map((d: typeof result.monthlyData[0]) => {
    if (showMonthly) {
      return `${d.month}`;
    } else {
      return `Ano ${Math.floor(d.month / 12) + 1}`;
    }
  });

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: 'Total Acumulado',
        data: filteredData.map((d: typeof result.monthlyData[0]) => d.totalAcumulado),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 3,
        fill: true,
        tension: 0.3,
        pointRadius: showMonthly ? 2 : 5,
        pointHoverRadius: showMonthly ? 4 : 7,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Valor Investido',
        data: filteredData.map((d: typeof result.monthlyData[0]) => d.totalInvested),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 3,
        fill: true,
        tension: 0.3,
        pointRadius: showMonthly ? 2 : 5,
        pointHoverRadius: showMonthly ? 4 : 7,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Total em Juros',
        data: filteredData.map((d: typeof result.monthlyData[0]) => d.totalJuros),
        borderColor: '#9333ea',
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderWidth: 3,
        fill: true,
        tension: 0.3,
        pointRadius: showMonthly ? 2 : 5,
        pointHoverRadius: showMonthly ? 4 : 7,
        pointBackgroundColor: '#9333ea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 13,
            weight: 600,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `R$ ${context.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: showMonthly,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          maxTicksLimit: showMonthly ? 12 : undefined,
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: (value: string | number) => {
            if (typeof value === 'number') {
              return `R$ ${(value / 1000).toFixed(1)}k`;
            }
            return value;
          },
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Composition Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Composição dos Juros Compostos
        </h3>
        <div className="flex justify-center">
          <div style={{ width: '300px', height: '300px' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Evolution Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Evolução no Tempo
            </h3>
            <p className="text-gray-600 text-sm">
              Este gráfico mostra como seu dinheiro cresce ao longo do tempo. Você
              pode acompanhar a evolução{' '}
              {showMonthly ? 'mensal' : 'anual'} dos seus investimentos e
              rendimentos, visualizando o poder dos juros compostos em ação.
            </p>
          </div>
          <div className="bg-linear-to-r from-gray-50 to-gray-100 p-2 rounded-lg border-2 border-gray-200 flex gap-2 whitespace-nowrap">
            <button
              onClick={() => setChartViewMode('monthly')}
              className={`px-4 py-2 rounded font-semibold transition ${
                chartViewMode === 'monthly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setChartViewMode('annual')}
              className={`px-4 py-2 rounded font-semibold transition ${
                chartViewMode === 'annual'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Anual
            </button>
          </div>
        </div>
        <div style={{ height: '400px' }}>
          <Line data={lineData} options={lineOptions} />
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Visualização {showMonthly ? 'mensal' : 'anual'} •{' '}
          {result.monthlyData.length} meses analisados
        </p>
      </div>
    </div>
  );
}
