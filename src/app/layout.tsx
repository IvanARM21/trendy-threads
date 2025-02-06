import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "TrendyThreads - A simple Clothing Store",
  description:
    "TrendyThreads es una tienda en línea que vende ropa de moda para hombres y mujeres, con un enfoque en tendencias actuales y precios accesibles. Ofrecemos ropa de alta calidad para todas las estaciones del año, desde prendas casuales hasta opciones más formales.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${urbanist.className} bg-gray-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
