import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://calculadora-juros-compostos.vercel.app'),
  title: "Calculadora de Juros Compostos | Simulador de Investimentos Gratuito",
  description: "Calculadora gratuita de juros compostos com gráficos interativos. Simule investimentos, visualize a evolução do patrimônio e compare cenários com aportes mensais.",
  keywords: [
    "calculadora juros compostos",
    "simulador investimento",
    "juros compostos",
    "calculadora investimento",
    "simulador financeiro",
    "aportes mensais",
    "rentabilidade investimento",
    "planejamento financeiro",
    "calculadora financeira",
    "investimento longo prazo"
  ],
  authors: [{ name: "Calculadora Juros Compostos" }],
  creator: "Calculadora Juros Compostos",
  publisher: "Calculadora Juros Compostos",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://calculadora-juros-compostos.vercel.app',
    title: 'Calculadora de Juros Compostos | Simulador de Investimentos',
    description: 'Simulador gratuito de juros compostos com gráficos interativos. Calcule a evolução do seu investimento com aportes mensais.',
    siteName: 'Calculadora Juros Compostos',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Calculadora de Juros Compostos',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Juros Compostos | Simulador Gratuito',
    description: 'Simule investimentos com juros compostos. Visualize gráficos e tabelas detalhadas da evolução patrimonial.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'seu-codigo-google-search-console',
  },
  alternates: {
    canonical: 'https://calculadora-juros-compostos.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://calculadora-juros-compostos.vercel.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
