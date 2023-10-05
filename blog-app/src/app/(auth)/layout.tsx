import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import './auth-layout.scss';
  import 'react-toastify/dist/ReactToastify.css';
import ToastProvider from "@/Components/ToastProvider/ToastProvider";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Best next js blogging app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
     
          <body className="clerk">
          <ToastProvider>
                {children}
          </ToastProvider>
           </body>
             
      </html>
    </ClerkProvider>
  );
}
