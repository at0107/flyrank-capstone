import "./globals.css";

export const metadata = {
  title: "FlyRank — Physics Settings",
  description: "Configure physics simulation parameters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
