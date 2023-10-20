import type { Metadata } from "next";
import "./root.scss";
import { ClerkProvider } from "@clerk/nextjs";
import NavigationBar from "@/Components/Navigation/Navigation";
import ThemeContextProvider from "@/Components/Theme-Provider/ThemeContextProvider";
import Main from "@/Components/Main/Main";
import ToastProvider from "@/Components/ToastProvider/ToastProvider";


export const metadata: Metadata = {
  title: "Blog App",
  description: "Best blogging app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeContextProvider>
            <Main>
              <NavigationBar />
              <ToastProvider>{children}</ToastProvider>
            </Main>
          </ThemeContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

