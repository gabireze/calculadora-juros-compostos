import { CalculationResult, formatCurrency } from '@/lib/compoundInterestCalculator';

interface ResultsDisplayProps {
  result: CalculationResult;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const investmentPercentage = (
    (result.totalInvested / result.totalFinal) *
    100
  ).toFixed(1);
  const jurosPercentage = (
    (result.totalJuros / result.totalFinal) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Resultado</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Valor total final</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(result.totalFinal)}
            </p>
          </div>
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Valor total investido</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(result.totalInvested)}
            </p>
          </div>
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total em juros</p>
            <p className="text-2xl font-bold text-purple-600">
              {formatCurrency(result.totalJuros)}
            </p>
          </div>
        </div>
      </div>

      {/* Composition */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Composição dos Juros Compostos
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Este gráfico mostra a composição final do seu investimento, dividindo
          entre o dinheiro que você investiu e os rendimentos gerados pelos
          juros compostos.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-linear-to-r from-green-50 to-green-100 rounded-lg p-4">
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(result.totalInvested)}
            </p>
            <p className="text-gray-600">Valor Investido</p>
            <p className="text-lg font-semibold text-green-600 mt-2">
              {investmentPercentage}% do total
            </p>
          </div>
          <div className="bg-linear-to-r from-purple-50 to-purple-100 rounded-lg p-4">
            <p className="text-2xl font-bold text-purple-600">
              {formatCurrency(result.totalJuros)}
            </p>
            <p className="text-gray-600">Total em Juros</p>
            <p className="text-lg font-semibold text-purple-600 mt-2">
              {jurosPercentage}% do total
            </p>
          </div>
        </div>
      </div>

      {/* Multiplier */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Multiplicador do Investimento
        </h3>
        <div className="bg-linear-to-r from-indigo-50 to-indigo-100 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-indigo-600 mb-2">
            {result.multiplier.toFixed(2)}x
          </p>
          <p className="text-gray-600">
            Seu dinheiro multiplicou por este fator
          </p>
        </div>
      </div>
    </div>
  );
}
