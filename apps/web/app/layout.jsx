import ReduxStore from "../components/ReduxStore/ReduxStore";

import "./globals.css";
import { Inter } from "next/font/google";

import { remoteConfig } from "../services/firebase";
import { fetchAndActivate } from "firebase/remote-config";

// Initialize Remote Config and get a reference to the service

fetchAndActivate(remoteConfig);

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crafter - Ecommerce website",
  description: "Get all the available items, that will be needed!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxStore>{children}</ReduxStore>
      </body>
    </html>
  );
}
