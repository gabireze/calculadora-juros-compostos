import { InvestmentData, formatCurrency } from '@/lib/compoundInterestCalculator';
import { useState } from 'react';

interface MonthlyTableProps {
  data: InvestmentData[];
  period: number;
  periodUnit: 'months' | 'years';
}

export default function MonthlyTable({ data }: MonthlyTableProps) {
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly');
  
  // Show all data for monthly, or aggregated data for annual
  const showMonthly = viewMode === 'monthly';
  const displayData = showMonthly
    ? data
    : data.filter((d) => d.month % 12 === 0 || d.month === data.length - 1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Detalhamento {showMonthly ? 'Mensal' : 'Anual'}
          </h3>
          <p className="text-gray-600 text-sm">
            Esta tabela apresenta o detalhamento {showMonthly ? 'mês a mês' : 'ano a ano'} da evolução dos seus investimentos, mostrando os juros {showMonthly ? 'mensais' : 'anuais'}, valor total investido,
            total de juros acumulados e o montante total acumulado.
          </p>
        </div>
        <div className="bg-linear-to-r from-gray-50 to-gray-100 p-2 rounded-lg border-2 border-gray-200 flex gap-2 whitespace-nowrap">
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-4 py-2 rounded font-semibold transition ${
              viewMode === 'monthly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setViewMode('annual')}
            className={`px-4 py-2 rounded font-semibold transition ${
              viewMode === 'annual'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Anual
          </button>
        </div>
      </div>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                {showMonthly ? 'Mês' : 'Ano'}
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                Juros {showMonthly ? 'Mês' : 'Ano'}
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                Total Investido
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                Total Juros
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                Total Acumulado
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {showMonthly ? row.month : Math.floor(row.month / 12)}
                </td>
                <td className="px-4 py-3 text-right text-gray-900">
                  {formatCurrency(row.jurosMonth)}
                </td>
                <td className="px-4 py-3 text-right text-gray-900">
                  {formatCurrency(row.totalInvested)}
                </td>
                <td className="px-4 py-3 text-right text-gray-900">
                  {formatCurrency(row.totalJuros)}
                </td>
                <td className="px-4 py-3 text-right text-gray-900 font-semibold">
                  {formatCurrency(row.totalAcumulado)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Evolução dos investimentos
      </p>
    </div>
  );
}
