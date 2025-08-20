import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GrafikInteraktifPage = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  // Generate data points for the parabola
  const generateData = () => {
    const data = [];
    for (let x = -10; x <= 10; x += 0.5) {
      const y = a * x * x + b * x + c;
      if (y >= -50 && y <= 50) { // Limit y range for better visualization
        data.push({ x, y: parseFloat(y.toFixed(2)) });
      }
    }
    return data;
  };

  const data = generateData();

  // Calculate discriminant and roots
  const discriminant = b * b - 4 * a * c;
  const hasRealRoots = discriminant >= 0;
  const roots = hasRealRoots ? [
    (-b + Math.sqrt(discriminant)) / (2 * a),
    (-b - Math.sqrt(discriminant)) / (2 * a)
  ] : [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Visualisasi Grafik Interaktif</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Kontrol Parameter</h2>

            <div className="space-y-4">
              {/* Parameter A */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Koefisien a: {a}
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={a}
                  onChange={(e) => setA(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-5</span>
                  <span>5</span>
                </div>
              </div>

              {/* Parameter B */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Koefisien b: {b}
                </label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.1"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-10</span>
                  <span>10</span>
                </div>
              </div>

              {/* Parameter C */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Koefisien c: {c}
                </label>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="0.1"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-20</span>
                  <span>20</span>
                </div>
              </div>
            </div>

            {/* Function Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Fungsi Kuadrat:</h3>
              <div className="text-lg font-mono text-indigo-700">
                f(x) = {a}x² {b >= 0 ? '+' : ''}{b}x {c >= 0 ? '+' : ''}{c}
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Analisis:</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Arah parabola:</span> {a > 0 ? 'Membuka ke atas' : 'Membuka ke bawah'}</p>
                <p><span className="font-semibold">Diskriminan:</span> {discriminant.toFixed(2)}</p>
                <p><span className="font-semibold">Titik puncak:</span> ({(-b/(2*a)).toFixed(2)}, {(a*(-b/(2*a))*(-b/(2*a)) + b*(-b/(2*a)) + c).toFixed(2)})</p>
                {hasRealRoots ? (
                  <div>
                    <p className="font-semibold text-green-700">Akar real:</p>
                    <p className="ml-2">x₁ = {roots[0].toFixed(2)}</p>
                    <p className="ml-2">x₂ = {roots[1].toFixed(2)}</p>
                  </div>
                ) : (
                  <p className="font-semibold text-red-700">Tidak memiliki akar real</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Grafik Parabola</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="x"
                    type="number"
                    domain={[-10, 10]}
                    ticks={[-10, -5, 0, 5, 10]}
                  />
                  <YAxis
                    domain={[-50, 50]}
                    ticks={[-50, -25, 0, 25, 50]}
                  />
                  <Tooltip
                    formatter={(value, name) => [value.toFixed(2), 'y']}
                    labelFormatter={(value) => `x: ${value}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, stroke: '#4f46e5', strokeWidth: 2, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrafikInteraktifPage;
