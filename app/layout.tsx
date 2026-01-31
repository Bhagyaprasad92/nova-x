import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NOVA X | Flagship Electric Skateboard",
  description: "Experience the future of personal mobility. Pure electric performance, engineered for speed and silence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-nova-black text-white antialiased overflow-x-hidden selection:bg-mobility-blue selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
