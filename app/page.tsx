"use client";

import { Upload, BrainCircuit, Play, Table } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50 p-8">
      {/* TITLE */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-3 rounded-2xl">
            <BrainCircuit size={30} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-blue-900">
              Missing Data Imputation
            </h1>

            <p className="text-blue-700 mt-1">
              Fill missing values using machine learning models
            </p>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6">
          {/* INPUT TITLE */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900">Input</h2>

            <p className="text-blue-600">Upload CSV dataset and select model</p>
          </div>

          {/* UPLOAD */}
          <div className="mb-6">
            <label className="border-2 border-dashed border-blue-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-blue-50">
              <Upload size={40} className="text-blue-600 mb-3" />

              <p className="font-semibold text-blue-900">Upload CSV File</p>

              <p className="text-sm text-blue-600 mt-1">
                Click to upload dataset
              </p>

              <input type="file" accept=".csv" className="hidden" />
            </label>
          </div>

          {/* MODEL SELECT */}
          <div className="mb-6">
            <label className="block text-blue-900 font-semibold mb-3">
              Select Imputation Model
            </label>

            <select className="w-full border border-blue-200 rounded-2xl p-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Random Forest</option>

              <option>XGBoost</option>

              <option>CatBoost</option>
            </select>
          </div>

          {/* RUN BUTTON */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
            <Play size={18} />
            Run Imputation
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6">
          {/* OUTPUT TITLE */}
          <div className="flex items-center gap-2 mb-6">
            <Table className="text-blue-600" />

            <div>
              <h2 className="text-2xl font-bold text-blue-900">Output</h2>

              <p className="text-blue-600">Result table after imputation</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-auto rounded-2xl border border-blue-100">
            <table className="w-full border-collapse">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-4 text-left text-blue-900">Age</th>

                  <th className="p-4 text-left text-blue-900">Salary</th>

                  <th className="p-4 text-left text-blue-900">Rating</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-blue-100">
                  <td className="p-4">25</td>

                  <td className="p-4 bg-yellow-100 font-semibold">4820</td>

                  <td className="p-4">4.5</td>
                </tr>

                <tr className="border-t border-blue-100">
                  <td className="p-4">30</td>

                  <td className="p-4">5000</td>

                  <td className="p-4 bg-yellow-100 font-semibold">4.8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
