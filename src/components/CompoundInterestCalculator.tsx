'use client';

import {
    calculateCompoundInterest,
    CalculationResult,
} from '@/lib/compoundInterestCalculator';
import { useState } from 'react';
import ChartsDisplay from './ChartsDisplay';
import MonthlyTable from './MonthlyTable';
import ResultsDisplay from './ResultsDisplay';

export default function CompoundInterestCalculator() {
  const [initialValue, setInitialValue] = useState(10000);
  const [monthlyValue, setMonthlyValue] = useState(1000);
  const [interestRate, setInterestRate] = useState(8);
  const [period, setPeriod] = useState(1);
  const [periodUnit, setPeriodUnit] = useState<'months' | 'years'>('years');
  const [rateType, setRateType] = useState<'annual' | 'monthly'>('annual');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    const isAnnualRate = rateType === 'annual';
    // Convert period to years
    const periodInYears = periodUnit === 'years' ? period : period / 12;
    const calculationResult = calculateCompoundInterest(
      initialValue,
      monthlyValue,
      interestRate,
      periodInYears,
      isAnnualRate
    );
    setResult(calculationResult);
  };

  const handleClear = () => {
    setInitialValue(10000);
    setMonthlyValue(1000);
    setInterestRate(8);
    setPeriod(1);
    setPeriodUnit('years');
    setRateType('annual');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Calculadora de Juros Compostos
          </h1>
          <p className="text-lg text-gray-600">
            Descubra o poder dos juros compostos e projete o crescimento de seus
            investimentos ao longo do tempo com nossa calculadora gratuita.
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-8 max-w-2xl mx-auto w-full">
          {/* Input Form */}
          <section aria-label="Formulário de simulação">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Simulador de Investimentos
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Initial Value */}
                <div>
                  <label htmlFor="initial-value" className="block text-sm font-semibold text-gray-800 mb-2">
                    Valor inicial
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-blue-700 font-bold text-lg" aria-hidden="true">
                      R$
                    </span>
                    <input
                      id="initial-value"
                      name="initial-value"
                      type="number"
                      value={initialValue}
                      onChange={(e) => setInitialValue(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 hover:bg-blue-100 transition text-gray-900 font-bold"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Monthly Value */}
                <div>
                  <label htmlFor="monthly-value" className="block text-sm font-semibold text-gray-800 mb-2">
                    Valor mensal
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-green-700 font-bold text-lg" aria-hidden="true">
                      R$
                    </span>
                    <input
                      id="monthly-value"
                      name="monthly-value"
                      type="number"
                      value={monthlyValue}
                      onChange={(e) => setMonthlyValue(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 hover:bg-green-100 transition text-gray-900 font-bold"
                      min="0"
                      step="0.01"
                      aria-label="Aporte mensal em reais"
                    />
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="sm:col-span-2">
                  <label htmlFor="interest-rate" className="block text-sm font-semibold text-gray-800 mb-2">
                    Taxa de juros
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-3 text-purple-700 font-bold text-lg" aria-hidden="true">
                        %
                      </span>
                      <input
                        id="interest-rate"
                        name="interest-rate"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 hover:bg-purple-100 transition text-gray-900 font-bold"
                        min="0"
                        step="0.01"
                        aria-label="Taxa de juros em porcentagem"
                      />
                    </div>
                    <div className="flex gap-0 bg-linear-to-r from-purple-50 to-purple-100 rounded-lg border-2 border-purple-200 whitespace-nowrap ">
                      <label className="flex items-center gap-2 cursor-pointer px-3 py-0 hover:bg-white/60 rounded transition h-full">
                        <input
                          type="radio"
                          name="rateType"
                          value="annual"
                          checked={rateType === 'annual'}
                          onChange={() => setRateType('annual')}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="text-sm font-semibold text-gray-800">anual</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer px-3 py-0 hover:bg-white/60 rounded transition h-full">
                        <input
                          type="radio"
                          name="rateType"
                          value="monthly"
                          checked={rateType === 'monthly'}
                          onChange={() => setRateType('monthly')}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="text-sm font-semibold text-gray-800">mensal</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Period */}
                <div className="sm:col-span-2">
                  <label htmlFor="period" className="block text-sm font-semibold text-gray-800 mb-2">
                    Período
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      id="period"
                      name="period"
                      type="number"
                      value={period}
                      onChange={(e) => setPeriod(Number(e.target.value))}
                      className="w-full sm:flex-1 pl-10 pr-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-indigo-50 hover:bg-indigo-100 transition font-semibold text-gray-900"
                      min="1"
                      step="1"
                      aria-label="Período do investimento"
                    />
                    <div className="bg-linear-to-r from-indigo-50 to-indigo-100 rounded-lg flex gap-0 border-2 border-indigo-200 whitespace-nowrap ">
                      <label className="flex items-center gap-2 cursor-pointer px-3 py-0 hover:bg-white/60 rounded transition h-full">
                        <input
                          type="radio"
                          name="periodUnit"
                          value="months"
                          checked={periodUnit === 'months'}
                          onChange={() => setPeriodUnit('months')}
                          className="w-4 h-4 accent-indigo-600"
                        />
                        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">mês</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer px-3 py-0 hover:bg-white/60 rounded transition h-full">
                        <input
                          type="radio"
                          name="periodUnit"
                          value="years"
                          checked={periodUnit === 'years'}
                          onChange={() => setPeriodUnit('years')}
                          className="w-4 h-4 accent-indigo-600"
                        />
                        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">ano</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 sm:col-span-2 pt-2">
                  <button
                    onClick={handleCalculate}
                    className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    aria-label="Calcular juros compostos"
                  >
                    Calcular
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    aria-label="Limpar formulário"
                  >
                    Limpar
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Results */}
          {result && (
            <section className="space-y-8" aria-label="Resultados da simulação">
              <ResultsDisplay result={result} />
              <ChartsDisplay result={result} period={period} periodUnit={periodUnit} />
            </section>
          )}
        </div>

        {/* Monthly Table */}
        {result && (
          <section className="mt-12 max-w-2xl mx-auto w-full" aria-label="Tabela detalhada">
            <MonthlyTable data={result.monthlyData} period={period} periodUnit={periodUnit} />
          </section>
        )}
      </div>
    </div>
  );
}
