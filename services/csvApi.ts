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

export interface SkylineRequest {
  rows: Record<string, any>[];
}

export interface SkylineResponse {
  skylineRows: Record<string, any>[];
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

    runSkyline: builder.mutation<
      SkylineResponse,
      SkylineRequest
    >({
      query: (body) => ({
        url: "/skyline",
        method: "POST",
        body,
      }),
    }),

  }),

});

export const {
  useUploadCsvMutation,
  useRunSkylineMutation,
} = csvApi;