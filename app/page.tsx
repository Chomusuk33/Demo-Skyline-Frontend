"use client";

/*
========================================
IMPORTS
========================================
*/

import {
  Upload,
  BrainCircuit,
  Play,
  Table,
} from "lucide-react";

import { useState } from "react";

import {
  useUploadCsvMutation,
} from "@/services/csvApi";

export default function Home() {

  const [file, setFile] =
    useState<File | null>(null);

  const [
    uploadCsv,
    {
      data,
      isLoading,
    },
  ] = useUploadCsvMutation();

  /*
  ========================================
  HANDLE UPLOAD
  ========================================
  */

  const handleUpload = async () => {
    if (!file) return;
    await uploadCsv(file);
  };

  /*
  ========================================
  UI
  ========================================
  */

  return (

    <main className="min-h-screen bg-blue-50 p-8">

      {/* ========================================
          TITLE SECTION
      ======================================== */}

      <div className="max-w-7xl mx-auto mb-8">

        <div className="flex items-center gap-3">

          {/* ICON */}
          <div className="bg-blue-600 text-white p-3 rounded-2xl">

            <BrainCircuit size={30} />

          </div>

          {/* TITLE */}
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

      {/* ========================================
          MAIN LAYOUT
      ======================================== */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ========================================
            LEFT PANEL
        ======================================== */}

        <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6">

          {/* INPUT TITLE */}
          <div className="mb-6">

            <h2 className="text-2xl font-bold text-blue-900">
              Input
            </h2>

            <p className="text-blue-600">
              Upload CSV dataset
            </p>

          </div>

          {/* ========================================
              UPLOAD AREA
          ======================================== */}

          <div className="mb-6">

            <label className="border-2 border-dashed border-blue-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-blue-50">

              {/* ICON */}
              <Upload
                size={40}
                className="text-blue-600 mb-3"
              />

              {/* TEXT */}
              <p className="font-semibold text-blue-900">
                Upload CSV File
              </p>

              {/* FILE NAME */}
              <p className="text-sm text-blue-600 mt-1">

                {file
                  ? file.name
                  : "Click to upload dataset"}

              </p>

              {/* HIDDEN INPUT */}
              <input
                type="file"
                accept=".csv"
                className="hidden"

                onChange={(e) => {

                  /*
                  lấy file đầu tiên
                  */

                  if (e.target.files?.[0]) {

                    setFile(
                      e.target.files[0]
                    );

                  }

                }}
              />

            </label>

          </div>

          {/* ========================================
              UPLOAD BUTTON
          ======================================== */}

          <button
            onClick={handleUpload}

            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >

            <Play size={18} />

            {/* loading text */}
            {isLoading
              ? "Uploading..."
              : "Upload CSV"}

          </button>

        </div>

        {/* ========================================
            RIGHT PANEL
        ======================================== */}

        <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6">

          {/* OUTPUT TITLE */}
          <div className="flex items-center gap-2 mb-6">

            <Table className="text-blue-600" />

            <div>

              <h2 className="text-2xl font-bold text-blue-900">
                Output
              </h2>

              <p className="text-blue-600">
                CSV preview table
              </p>

            </div>

          </div>

          {/* ========================================
              EMPTY STATE
          ======================================== */}

          {!data && (

            <div className="h-[400px] flex items-center justify-center text-blue-400">

              Upload a CSV file to preview dataset

            </div>

          )}
          {/* ========================================
              TABLE + STATISTICS
          ======================================== */}
          {data && (
            <>
              <div className="mb-4 flex flex-wrap gap-4">

                {/* ROW COUNT */}
                <div className="bg-blue-50 px-4 py-2 rounded-xl">

                  Rows: {data.rows.length}

                </div>

                {/* COLUMN COUNT */}
                <div className="bg-blue-50 px-4 py-2 rounded-xl">

                  Columns: {data.columns.length}

                </div>

              </div>

              {/* ========================================
                  TABLE
              ======================================== */}

              <div className="overflow-auto rounded-2xl border border-blue-100">

                <table className="w-full border-collapse">
                  <thead className="bg-blue-100">
                    <tr>
                      {data?.columns.map(
                        (column) => (

                          <th
                            key={column}

                            className="p-4 text-left text-blue-900"
                          >

                            {column}

                          </th>

                        )
                      )}

                    </tr>

                  </thead>

                  <tbody>
                    {data?.rows.map(
                      (row, index) => (
                        <tr
                          key={index}
                          className="border-t border-blue-100"
                        >
                          {data?.columns.map(
                            (column) => {
                              /*
                              CHECK MISSING CELL
                              */
                              const isMissing =
                                data.missingCells.some(
                                  (cell) =>
                                    cell.row === index &&
                                    cell.column === column
                                );

                              return (

                                <td
                                  key={column}
                                  /*highlight missing cells*/
                                  className={`p-4 ${
                                    isMissing
                                      ? "bg-yellow-100 font-semibold text-yellow-900"
                                      : ""
                                  }`}
                                >
                        
                                  {
                                    row[column] === "" ||
                                    row[column] === null ||
                                    row[column] === undefined
                                      ? "MISSING"
                                      : row[column]
                                  }
                                </td>
                              );
                            }
                          )}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}