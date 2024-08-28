import Header from "@/components/Header";
import MuiThemeProvider from "@/lib/utils/muiThemeProvider";
import ReactQueryProvider from "@/lib/utils/reactQueryProvider";
import ReduxProvider from "@/lib/utils/reduxQueryProvider";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
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
      <body className="relative font-base underline-offset-4">
        <MuiThemeProvider>
          <ReactQueryProvider>
            <ReduxProvider>
              <Header />
              <div className="from-background-primary flex justify-center min-h-[calc(100vh-128px)] bg-white bg-gradient-to-b to-white to-50% pt-[62px]">
                {children}
              </div>
              <ToastContainer autoClose={1500} position="bottom-right" />
            </ReduxProvider>
          </ReactQueryProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
