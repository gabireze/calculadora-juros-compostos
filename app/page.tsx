import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos | Simulador de Investimentos Gratuito",
  description: "Calculadora gratuita de juros compostos com gráficos interativos. Simule investimentos, visualize a evolução do patrimônio e compare cenários com aportes mensais.",
};

export default function Home() {
  // Structured Data para SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Juros Compostos",
    "applicationCategory": "FinanceApplication",
    "description": "Calculadora gratuita de juros compostos com gráficos interativos para simulação de investimentos com aportes mensais",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "featureList": [
      "Cálculo de juros compostos",
      "Aportes mensais",
      "Gráficos interativos",
      "Tabela de evolução",
      "Visualização mensal e anual"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="w-full">
        <CompoundInterestCalculator />
      </main>
    </>
  );
}
