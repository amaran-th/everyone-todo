import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "모두의 TODO",
  description: "우리 모두의 Task 관리 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className="relative font-base">
        <Header />
        <div className="from-background-primary flex justify-center min-h-[calc(100vh-128px)] bg-white bg-gradient-to-b to-white to-50% pt-[62px]">
          {children}
        </div>
      </body>
    </html>
  );
}
