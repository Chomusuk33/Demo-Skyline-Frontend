import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface MissingCell {
  row: number;
  column: string;
}

export interface CsvResponse {

  columns: string[];

  rows: Record<string, string>[];

  missingCells: MissingCell[];

}

export const csvApi = createApi({
  reducerPath: "csvApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),

  endpoints: (builder) => ({
    uploadCsv: builder.mutation<CsvResponse, File>({
      query: (file) => {
        const formData = new FormData();

        formData.append("file", file);

        return {
          url: "/csv/upload",
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