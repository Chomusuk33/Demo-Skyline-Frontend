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
  Search,
} from "lucide-react";

import { useState } from "react";

import {
  useUploadCsvMutation,
  useRunSkylineMutation,
} from "@/services/csvApi";

export default function Home() {

  /*
  ========================================
  STATES
  ========================================
  */

  const [file, setFile] =
    useState<File | null>(null);

  const [model, setModel] =
    useState("rf");

  /*
  ========================================
  RTK QUERY
  ========================================
  */

  const [
    uploadCsv,
    {
      data,
      isLoading,
    },
  ] = useUploadCsvMutation();

  const [
    runSkyline,
    {
      data: skylineData,
      isLoading: skylineLoading,
    },
  ] = useRunSkylineMutation();

  /*
  ========================================
  HANDLE IMPUTATION
  ========================================
  */

  const handleUpload =
    async () => {

      if (!file) {

        alert(
          "Please upload CSV file"
        );

        return;
      }

      try {

        await uploadCsv({
          file,
          model,
        }).unwrap();

      }
      catch (error) {

        console.log(
          "ERROR:",
          error
        );

      }

    };

  /*
  ========================================
  HANDLE SKYLINE
  ========================================
  */

  const handleSkyline =
    async () => {

      if (!data) {

        alert(
          "Run imputation first"
        );

        return;

      }

      try {

        await runSkyline({
          rows: data.rows,
        }).unwrap();

      }
      catch (error) {

        console.error(error);

      }

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

      <div
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
      >

        {/* ========================================
            LEFT PANEL
        ======================================== */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-blue-100
            p-6
          "
        >

          {/* TITLE */}
          <div className="mb-6">

            <h2
              className="
                text-2xl
                font-bold
                text-blue-900
              "
            >
              Input
            </h2>

            <p className="text-blue-600">
              Upload CSV dataset
            </p>

          </div>

          {/* ========================================
              FILE UPLOAD
          ======================================== */}

          <div className="mb-6">

            <label
              className="
                border-2
                border-dashed
                border-blue-200
                rounded-2xl
                p-8
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                hover:border-blue-500
                transition
                bg-blue-50
              "
            >

              <Upload
                size={40}
                className="
                  text-blue-600
                  mb-3
                "
              />

              <p
                className="
                  font-semibold
                  text-blue-900
                "
              >
                Upload CSV File
              </p>

              <p
                className="
                  text-sm
                  text-blue-600
                  mt-1
                "
              >

                {file
                  ? file.name
                  : "Click to upload dataset"}

              </p>

              <input
                type="file"
                accept=".csv"
                className="hidden"

                onChange={(e) => {

                  if (
                    e.target.files?.[0]
                  ) {

                    setFile(
                      e.target.files[0]
                    );

                  }

                }}
              />

            </label>

          </div>

          {/* ========================================
              MODEL SELECT
          ======================================== */}

          <div className="mb-6">

            <label
              className="
                block
                text-blue-900
                font-semibold
                mb-2
              "
            >
              Select Model
            </label>

            <select
              value={model}

              onChange={(e) =>
                setModel(
                  e.target.value
                )
              }

              className="
                w-full
                border
                border-blue-200
                rounded-2xl
                p-3
                bg-white
              "
            >

              <option value="rf">
                Random Forest
              </option>

              <option value="catboost">
                CatBoost
              </option>

              <option value="xgboost">
                XGBoost
              </option>

            </select>

          </div>

          {/* ========================================
              RUN IMPUTATION BUTTON
          ======================================== */}

          <button
            onClick={handleUpload}

            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              py-4
              rounded-2xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <Play size={18} />

            {
              isLoading
                ? "Running..."
                : "Run Imputation"
            }

          </button>

          {/* ========================================
              SKYLINE BUTTON
          ======================================== */}

          <button
            onClick={handleSkyline}

            disabled={!data}

            className="
              w-full
              mt-4
              bg-purple-600
              hover:bg-purple-700
              disabled:bg-gray-300
              disabled:cursor-not-allowed
              transition
              text-white
              py-4
              rounded-2xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <Search size={18} />

            {
              skylineLoading
                ? "Running Skyline..."
                : "Run Skyline Query"
            }

          </button>

        </div>

        {/* ========================================
            RIGHT PANEL
        ======================================== */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-blue-100
            p-6
          "
        >

          {/* TITLE */}
          <div className="flex items-center gap-2 mb-6">

            <Table className="text-blue-600" />

            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-blue-900
                "
              >
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

            <div
              className="
                h-[400px]
                flex
                items-center
                justify-center
                text-blue-400
              "
            >

              Upload a CSV file to preview dataset

            </div>

          )}

          {/* ========================================
              RESULT TABLE
          ======================================== */}

          {data && (

            <>

              {/* STATS */}

              <div
                className="
                  mb-4
                  flex
                  flex-wrap
                  gap-4
                "
              >

                <div
                  className="
                    bg-blue-50
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  Rows:
                  {" "}
                  {data.rows.length}
                </div>

                <div
                  className="
                    bg-blue-50
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  Columns:
                  {" "}
                  {data.columns.length}
                </div>

                <div
                  className="
                    bg-green-50
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  Model:
                  {" "}
                  {model.toUpperCase()}
                </div>

              </div>

              {/* ========================================
                  SKYLINE RESULT
              ======================================== */}

              {skylineData && (

                <div className="mb-8">

                  <h3
                    className="
                      text-xl
                      font-bold
                      text-purple-700
                      mb-4
                    "
                  >
                    Skyline Results
                  </h3>

                  <div
                    className="
                      overflow-auto
                      rounded-2xl
                      border
                      border-purple-200
                    "
                  >

                    <table
                      className="
                        w-full
                        border-collapse
                      "
                    >

                      <thead
                        className="
                          bg-purple-100
                        "
                      >

                        <tr>

                          {data.columns.map(
                            (column) => (

                              <th
                                key={column}
                                className="
                                  p-4
                                  text-left
                                "
                              >

                                {column}

                              </th>

                            )
                          )}

                        </tr>

                      </thead>

                      <tbody>

                        {skylineData.skylineRows.map(
                          (
                            row,
                            index
                          ) => (

                            <tr
                              key={index}
                              className="
                                border-t
                              "
                            >

                              {data.columns.map(
                                (column) => (

                                  <td
                                    key={column}
                                    className="p-4"
                                  >

                                    {row[column]}

                                  </td>

                                )
                              )}

                            </tr>

                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              )}

              {/* ========================================
                  IMPUTED TABLE
              ======================================== */}

              <div
                className="
                  overflow-auto
                  rounded-2xl
                  border
                  border-blue-100
                "
              >

                <table
                  className="
                    w-full
                    border-collapse
                  "
                >

                  <thead
                    className="
                      bg-blue-100
                    "
                  >

                    <tr>

                      {data.columns.map(
                        (column) => (

                          <th
                            key={column}
                            className="
                              p-4
                              text-left
                              text-blue-900
                            "
                          >

                            {column}

                          </th>

                        )
                      )}

                    </tr>

                  </thead>

                  <tbody>

                    {data.rows.map(
                      (
                        row,
                        index
                      ) => (

                        <tr
                          key={index}
                          className="
                            border-t
                            border-blue-100
                          "
                        >

                          {data.columns.map(
                            (column) => {

                              const isImputed =
                                data.imputedCells?.some(
                                  (cell) =>
                                    cell.row === index &&
                                    cell.column === column
                                ) ?? false;

                              return (

                                <td
                                  key={column}

                                  className={`p-4 ${
                                    isImputed
                                      ? "bg-green-100 font-bold text-green-900"
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