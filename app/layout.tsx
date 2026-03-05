import "./globals.css";
import { CheckoutProvider } from "./context/CheckoutContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CheckoutProvider>
          {children}
        </CheckoutProvider>
      </body>
    </html>
  );
}