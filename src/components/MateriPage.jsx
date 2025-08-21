import React, { useState } from 'react';

const MateriPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('kuadrat');
  const topics = {
    kuadrat: {
      title: 'Persamaan Kuadrat',
      content: `
        Persamaan kuadrat adalah persamaan polynomial berderajat dua yang memiliki bentuk umum:

        ax² + bx + c = 0

        dimana a ≠ 0, dan a, b, c adalah konstanta real.

        Untuk menyelesaikan persamaan kuadrat, kita dapat menggunakan beberapa metode:
        1. Faktoring: Mencari faktor-faktor dari persamaan
        2. Melengkapkan kuadrat sempurna
        3. Rumus kuadrat: x = (-b ± √(b²-4ac)) / 2a

        Diskriminan (D = b²-4ac) menentukan jenis akar:
        • D > 0: dua akar real berbeda
        • D = 0: satu akar real (kembar)
        • D < 0: dua akar kompleks
      `,
      formula: 'x = (-b ± √(b²-4ac)) / 2a'
    },
    trigonometri: {
      title: 'Trigonometri',
      content: `
        Trigonometri adalah cabang matematika yang mempelajari hubungan antara sudut dan sisi dalam segitiga.

        Fungsi trigonometri dasar:
        • sin θ = sisi depan / hipotenusa
        • cos θ = sisi samping / hipotenusa
        • tan θ = sisi depan / sisi samping

        Identitas trigonometri penting:
        • sin²θ + cos²θ = 1
        • tan θ = sin θ / cos θ
        • 1 + tan²θ = sec²θ

        Nilai-nilai khusus:
        • sin 30° = 1/2, cos 30° = √3/2
        • sin 45° = √2/2, cos 45° = √2/2
        • sin 60° = √3/2, cos 60° = 1/2
      `,
      formula: 'sin²θ + cos²θ = 1'
    },
    logaritma: {
      title: 'Logaritma',
      content: `
        Logaritma adalah operasi matematika yang merupakan kebalikan dari eksponen.

        Jika aˣ = b, maka log_a(b) = x

        Sifat-sifat logaritma:
        • log_a(xy) = log_a(x) + log_a(y)
        • log_a(x/y) = log_a(x) - log_a(y)
        • log_a(xⁿ) = n × log_a(x)
        • log_a(a) = 1
        • log_a(1) = 0

        Jenis logaritma:
        • Logaritma natural: ln x (basis e)
        • Logaritma common: log x (basis 10)
        • Logaritma biner: log₂ x (basis 2)
      `,
      formula: 'log_a(xy) = log_a(x) + log_a(y)'
    },
    kombinatorik: {
      title: 'Kombinatorik',
      content: `
        Kombinatorik adalah cabang matematika yang mempelajari cara menghitung dan mengatur objek-objek.

        ATURAN PERKALIAN DAN PENJUMLAHAN:

        Aturan Perkalian:
        Jika suatu kejadian dapat terjadi dengan m cara, dan kejadian lain dapat terjadi dengan n cara, maka kedua kejadian tersebut dapat terjadi bersama-sama dengan m × n cara.

        Aturan Penjumlahan:
        Jika suatu kejadian dapat terjadi dengan m cara atau kejadian lain dapat terjadi dengan n cara (tidak bersamaan), maka salah satu dari kedua kejadian tersebut dapat terjadi dengan m + n cara.

        PERMUTASI:
        Permutasi adalah susunan objek-objek dimana urutan diperhatikan.

        • Permutasi n objek: P(n,n) = n!
        • Permutasi r dari n objek: P(n,r) = n!/(n-r)!
        • Permutasi dengan pengulangan: n!/n₁!n₂!...nₖ!

        KOMBINASI:
        Kombinasi adalah pemilihan objek-objek dimana urutan tidak diperhatikan.

        • Kombinasi r dari n objek: C(n,r) = n!/(r!(n-r)!)
        • Sifat: C(n,r) = C(n,n-r)
        • Segitiga Pascal: C(n,r) = C(n-1,r-1) + C(n-1,r)
      `,
      formula: 'P(n,r) = n!/(n-r)! dan C(n,r) = n!/(r!(n-r)!)'
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Materi Pembelajaran</h1>

      {/* Topic Selector */}
      <div className="flex space-x-2 mb-8">
        {Object.keys(topics).map(topic => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              selectedTopic === topic
                ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-indigo-50 border-2 border-gray-200'
            }`}
          >
            {topics[topic].title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{topics[selectedTopic].title}</h2>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          {topics[selectedTopic].content.split('\n').map((line, index) => (
            line.trim() && <p key={index} className="mb-3">{line.trim()}</p>
          ))}
        </div>

        {/* Formula Highlight */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-l-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Rumus Utama:</h3>
          <div className="text-2xl font-mono text-indigo-700 bg-white rounded-lg p-4 text-center shadow-inner">
            {topics[selectedTopic].formula}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriPage;
