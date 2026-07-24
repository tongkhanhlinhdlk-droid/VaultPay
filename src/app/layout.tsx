import type { Metadata } from "next";
import "./globals.css";
import Web3Provider from "@/providers/Web3Provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "VaultPay",
  description: "Web3 Escrow Payment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Web3Provider>
            <Navbar />
            {children}
          </Web3Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}