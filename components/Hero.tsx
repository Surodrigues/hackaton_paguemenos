import React from 'react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Promoções imperdíveis</h1>
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Encontre ofertas em produtos de saúde e beleza.
        </p>
        <div className="flex justify-center">
          <button className="bg-white text-emerald-600 font-semibold px-6 py-3 rounded shadow">
            Ver Ofertas
          </button>
        </div>
      </div>
    </section>
  )
}
