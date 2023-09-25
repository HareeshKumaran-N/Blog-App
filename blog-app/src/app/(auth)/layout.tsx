import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import './auth-layout.scss';

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
        <body className="clerk">{children}</body>
      </html>
    </ClerkProvider>
  );
}
