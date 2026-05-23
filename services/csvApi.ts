import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export interface ImputedCell {
  row: number;
  column: string;
}

export interface CsvResponse {
  columns: string[];
  rows: Record<string, any>[];
  imputedCells: ImputedCell[];
}

export interface ImputeRequest {
  file: File;
  model: string;
}

export const csvApi = createApi({
  reducerPath: "csvApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  endpoints: (builder) => ({

    uploadCsv: builder.mutation<
      CsvResponse,
      ImputeRequest
    >({

      query: ({
        file,
        model,
      }) => {

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "model",
          model
        );

        return {
          url: "/impute",
          method: "POST",
          body: formData,
        };

      },

    }),

  }),

});

export const {
  useUploadCsvMutation,
} = csvApi;