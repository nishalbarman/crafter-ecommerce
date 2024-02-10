import { Toaster } from "react-hot-toast";
import ReduxStore from "../components/ReduxStore/ReduxStore";
import { CookiesProvider } from "next-client-cookies/server";

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crafter - Ecommerce website",
  description: "Get all the available items, that will be needed!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <CookiesProvider>
          <ReduxStore>{children}</ReduxStore>
        </CookiesProvider>
      </body>
    </html>
  );
}
