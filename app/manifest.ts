import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Calculadora de Juros Compostos',
    short_name: 'Juros Compostos',
    description: 'Calculadora gratuita de juros compostos com gráficos interativos para simulação de investimentos',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
