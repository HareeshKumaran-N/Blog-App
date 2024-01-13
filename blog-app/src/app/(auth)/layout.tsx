"use client"

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import './auth-layout.scss';
import 'react-toastify/dist/ReactToastify.css';
import ToastProvider from "@/Components/ToastProvider/ToastProvider";
import { useState,useEffect } from "react";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
 {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (typeof window.localStorage) {
      if (localStorage.getItem("Theme")) {
        setTheme(localStorage.getItem("Theme"));
      } else {
        setTheme("dark");
      }
    }
  }, []);
  
  return (
    <ClerkProvider>
      <html lang="en">
     
          <body className={((theme==="dark")?"dark-mode":"light-mode")+" clerk"}>
          <ToastProvider>
                {children}
          </ToastProvider>
           </body>
             
      </html>
    </ClerkProvider>
  );
}
