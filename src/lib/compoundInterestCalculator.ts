export interface InvestmentData {
  month: number;
  jurosMonth: number;
  totalInvested: number;
  totalJuros: number;
  totalAcumulado: number;
}

export interface CalculationResult {
  totalFinal: number;
  totalInvested: number;
  totalJuros: number;
  multiplier: number;
  monthlyData: InvestmentData[];
}

export function calculateCompoundInterest(
  initialValue: number,
  monthlyValue: number,
  annualRate: number,
  periodYears: number,
  isAnnualRate: boolean = true
): CalculationResult {
  // Convert annual rate to monthly rate if needed
  const monthlyRate = isAnnualRate ? annualRate / 100 / 12 : annualRate / 100;
  const totalMonths = periodYears * 12;

  const monthlyData: InvestmentData[] = [];
  let totalInvested = initialValue;
  let totalJuros = 0;
  let totalAcumulado = initialValue;

  // Calculate month by month
  for (let month = 0; month < totalMonths; month++) {
    // Interest earned this month on current balance
    const jurosMonth = totalAcumulado * monthlyRate;
    
    // Add interest to accumulated total
    totalAcumulado += jurosMonth;
    
    // Add monthly contribution (if not the first month, add at beginning)
    if (month > 0) {
      totalInvested += monthlyValue;
      totalAcumulado += monthlyValue;
    }

    totalJuros += jurosMonth;

    monthlyData.push({
      month,
      jurosMonth: parseFloat(jurosMonth.toFixed(2)),
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      totalJuros: parseFloat(totalJuros.toFixed(2)),
      totalAcumulado: parseFloat(totalAcumulado.toFixed(2)),
    });
  }

  const totalFinal = parseFloat(totalAcumulado.toFixed(2));
  const multiplier = parseFloat((totalFinal / totalInvested).toFixed(2));

  return {
    totalFinal,
    totalInvested: parseFloat(totalInvested.toFixed(2)),
    totalJuros: parseFloat(totalJuros.toFixed(2)),
    multiplier,
    monthlyData,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}
