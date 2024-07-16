import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoMeet - Dawan Company",
  description:
    "Start your next meeting here, An Dawan18 Company - Created By Dharshan J",
  icons: {
    icon: "/icon/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/icons/yoom-logo.svg",
            socialButtonsVariant: "iconButton",
          },

          variables: {
            colorText: "#ffffff",
            colorPrimary: "#CC5500",
            colorBackground: "#2F4F4F",
            colorInputBackground: "#000000",
            colorInputText: "#ffffff",
          },
        }}
      >
        <body className={`${inter.className} bg-dark-1`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
