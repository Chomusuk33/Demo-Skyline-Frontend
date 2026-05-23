import "./globals.css";

import ReduxProvider from "@/providers/ReduxProvider";

export const metadata = {
  title: "Missing Data Imputation",
  description: "CSV Imputation Demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >

      <body suppressHydrationWarning>

        <ReduxProvider>
          {children}
        </ReduxProvider>

      </body>

    </html>
  );

}