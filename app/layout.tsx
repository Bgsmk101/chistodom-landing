import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ЧистоДом — химчистка мебели с выездом",
  description:
    "Демонстрационный лендинг химчистки диванов, кресел, матрасов и ковров с выездом на дом.",
  icons: {
    icon: "favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
